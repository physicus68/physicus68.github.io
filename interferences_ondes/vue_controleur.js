// Voir principe Modèle-Vue-Controleur

// controleurs - ils mettent à jour le modèle

var slider = document.getElementById("ecart");
slider.value = (modele_physique.d / modele_physique.d_max) * 100;
slider.oninput = function () {
  modele_physique.set_d((this.value / 100.0) * modele_physique.d_max);
};

var frequence = document.getElementById("freq");
frequence.value = modele_physique.f;
frequence.oninput = function () {
  modele_physique.set_f(this.value);
};

var amplitude = document.getElementById("ampli");
amplitude.value = modele_physique.A1;
amplitude.oninput = function () {
  modele_physique.set_A1_A2(amplitude.value, amplitude.value);
};

var bouton_pause = document.getElementById("pause");
bouton_pause.onclick = function () {
  if (modele_physique.en_pause) {
    modele_physique.marche();
  } else {
    modele_physique.pause(Date.now());
  }
};

// vues - elles s'inscivent auprès du modèle qui leur signifie
// toute mise à jour. Chaque vue récupère la donnée qui la
// concerne

var valeur_ecart = document.getElementById("ecart_valeur");
modele_physique.addListener(valeur_ecart);
valeur_ecart.modelUpdated = function () {
  this.innerHTML = " d = " + parseFloat(modele_physique.d).toFixed(2) + " m";
};

var valeur_freq = document.getElementById("freq_valeur");
modele_physique.addListener(valeur_freq);
valeur_freq.modelUpdated = function () {
  this.innerHTML = " F = " + parseFloat(modele_physique.f).toFixed(2) + " Hz";
};

var valeur_ampli = document.getElementById("ampli_valeur");
modele_physique.addListener(valeur_ampli);
valeur_ampli.modelUpdated = function () {
  this.innerHTML = " A = " + parseFloat(modele_physique.A1).toFixed(2) + " m";
};

// mise à jour des vues
modele_physique.updated();
