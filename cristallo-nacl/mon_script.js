// indices pour récupérer les paramètres des atomes d'une maille
let ATOME = 0;
let X     = 1;
let Y     = 2;
let Z     = 3;

// dimensions du cristal ( x 0.1 nm )
let x_max = 25;
let y_max = 25;
let z_max = 25;

// permet d'explorer toutes les mailles du cristal
let n = 10;

/*
 *   cristal de sel NaCl
 */

// indices des atomes
let Na = 0;
let Cl = 1;
// couleurs des atomes
let couleurs = [ "Gray" ,"ForestGreen" ];
// rayons de van der waals des atomes ( x 0.1 nm )
let rayons   = [ "0.99" , "1.81" ];
// position des ions Na+ et Cl- dans la maille du chlorure de sodium
const maille = [
  [Na, 0, 0, 0],        [Cl, 2.82, 0, 0],     
  [Na, 2.82, 2.82, 0],  [Cl, 5.64, 2.82, 0],     
  [Na, 2.82, 0 , 2.82],  [Cl, 5.64,0, 2.82],     
  [Na, 0 , 2.82, 2.82],  [Cl,2.82, 2.82, 2.82]    
];

// tracé des atomes d'une maille en x0,y0,z0, 
// si ils appartiennent au volume du cristal
function tracer_maille(x0, y0, z0) {
  maille.forEach((element) => {
    let atome = element[ATOME];
    let x     = element[X] + x0;
    let y     = element[Y] + y0;
    let z     = element[Z] + z0;
    if ( Math.abs(x) < x_max/2 && Math.abs(y) < y_max/2 && Math.abs(z) < z_max/2 ){
      var el = document.createElement("a-sphere");
      el.setAttribute("radius", rayons[atome]);
      el.setAttribute("color", couleurs[atome]);
      el.setAttribute("position", "" + x + " " + y + " " + z);
      document.querySelector("a-scene").appendChild(el);
    }
  });
}

// construction du cristal dans une zone définie par un volume 
// h x l x w. Si besoin, augmenter la valeur de n
for (let i = -n; i < n; i++) {
    for (let j = -n; j < n; j++) {
        for (let k = -n; k < n; k++) {
            // la maille est cubique
            tracer_maille( i * 5.64  , j * 5.64  , k * 5.64);
        }
    }
}

// desiner une échelle au pied du cristal
var el_echelle = document.createElement("a-box");
el_echelle.setAttribute("color", "Orange");
el_echelle.setAttribute("depth", "1.0");
el_echelle.setAttribute("height", "0.25");
el_echelle.setAttribute("width", "10");
el_echelle.setAttribute("position", "" + (-0.5 * x_max + 5) + " "+ (-0.5 * y_max) + " " +  (z_max * 0.5 + 3)  );
document.querySelector("a-scene").appendChild(el_echelle);


