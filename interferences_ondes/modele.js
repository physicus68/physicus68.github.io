// modèle physique: paramètres de l'animation

let modele_physique = {

  // paramètres de l'onde  
  d: 2.5,
  d_max: 10.0,
  v: 2.0, // m/s
  f: 1.0, // Hz
  A1: 0.04, // m
  A2: 0.04, // m

  // gestion de la mise en pause
  en_pause: false,
  t_pause_d: 0.0,
  t_decallage: 0.0,

  // listeners qui sont mis à jour (MVC)
  listener: [],

  
  addListener: function (l) {
    this.listener.push(l);
  },

  updated: function () {
    this.listener.forEach((l) => {
      l.modelUpdated();
    });
  },

  pause: function (t) {
    this.en_pause = true;
    this.t_pause_d = t;
  },

  marche: function () {
    this.en_pause = false;
    this.t_decallage = this.t_decallage + Date.now() - this.t_pause_d;
  },

  set_d: function (d) {
    this.d = d;
    this.updated();
  },

  set_f: function (f) {
    this.f = f;
    this.updated();
  },
  set_A1_A2: function (a1, a2) {
    this.A1 = a1;
    this.A2 = a2;
    this.updated();
  },

  x1: function () {
    return 5.0;
  },

  y1: function () {
    return this.d * 0.5;
  },
  x2: function () {
    return 5.0;
  },

  y2: function () {
    return -this.d * 0.5;
  },
  w: function () {
    return 2 * Math.PI * this.f * 0.001;
  },
  c: function () {
    return this.v * 0.001;
  },
};

// composants pour Aframe

// animation de l'onde - déformation d'une surface
AFRAME.registerComponent("onde", {
  schema: {},
  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
    this.position = this.el.getObject3D("mesh").geometry.attributes.position;
    this.position.needsUpdate = true;
  },
  update: function () {},
  tick: function (t) {
    if (modele_physique.en_pause) {
      return;
    }

    t = t - modele_physique.t_decallage;

    for (let i = 0; i < this.position.count; i++) {
      var x1 = this.position.getX(i) - modele_physique.x1();
      var y1 = this.position.getY(i) - modele_physique.y1();
      var d1 = Math.sqrt(x1 * x1 + y1 * y1);
      var x2 = this.position.getX(i) - modele_physique.x2();
      var y2 = this.position.getY(i) - modele_physique.y2();
      var d2 = Math.sqrt(x2 * x2 + y2 * y2);
      var z =
        modele_physique.A1 *
          Math.sin(modele_physique.w() * (t - d1 / modele_physique.c())) +
        modele_physique.A2 *
          Math.sin(modele_physique.w() * (t - d2 / modele_physique.c()));
      this.position.setZ(i, z);
    }
    this.position.needsUpdate = true;
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});


// sources des ondes - gestion dynamique de leur position
AFRAME.registerComponent("source", {
  schema: {
    num: { type: "int", default: 1 },
  },
  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, 100, this);
    this.position = this.el.object3D.position;
  },
  update: function () {},
  tick: function (t) {
    if (modele_physique.en_pause) {
      return;
    }

    if (this.data.num == 1) {
      this.position.x = modele_physique.x1();
      this.position.z = modele_physique.y1();
    }

    if (this.data.num == 2) {
      this.position.x = modele_physique.x2();
      this.position.z = modele_physique.y2();
    }
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});
