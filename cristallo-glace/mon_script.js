// indices pour récupérer les paramètres des atomes d'une maille
let ATOME = 0;
let X     = 1;
let Y     = 2;
let Z     = 3;

// dimensions du cristal ( x 0.1 nm )
let x_max = 30;
let y_max = 20;
let z_max = 30;

// permet d'explorer toutes les mailles du cristal
let n = 10;

/*
 *   cristal d'eau - glace Ih - valeurs extraites d'un modèle .cif importé dans Avogadro
 */

// indices des atomes
let O = 0;
let H = 1;
// couleurs des atomes
let couleurs = [ "#ff0000" , "#f0f0f0" ];
// rayons de van der waals des atomes ( x 0.1 nm )
let rayons   = [ "1.52" , "1.15" ];
// position des atomes O et H dans la maille de la glace d'eau Ih 
const maille = [
  [O, 2.60641, -0.0, 0.46],    [O, 5.21359, -0.0, 6.9],   
  [H, 2.60641, -0.0, 1.28064],  [H, 3.42516, -0.0, 0.19136],   
  [H, 5.62649, 0.71109, 7.176],   [O, -1.3032, 2.25721, 0.46],
  [O, 2.6068, 4.5151, 0.46],   [O, 5.21359, -0.0, 4.14],   
  [O, -2.6068, 4.5151, 4.14],  [O, 1.3032, 2.25721, 4.14],  
  [O, -2.6068, 4.5151, 6.9],  [O, 1.3032, 2.25721, 6.9],
  [O, 2.60641, -0.0, 3.22],  [O, -1.3032, 2.25721, 3.22], 
  [O, 2.6068, 4.5151, 3.22],  [H, -1.3032, 2.25721, 1.28064],
  [H, 2.6068, 4.5151, 1.28064],  [H, 5.21359, -0.0, 4.96064],
  [H, -2.6068, 4.5151, 4.96064],  [H, 1.3032, 2.25721, 4.96064], 
  [H, -1.71258, 2.96628, 0.19136],  [H, 2.19742, 3.80604, 0.19136], 
  [H, 4.39484, -0.0, 3.87136],  [H, -2.19742, 3.80604, 3.87136],
  [H, 1.71258, 2.96628, 3.87136],  [H, 4.39093, 4.51714, 7.176], 
  [H, 1.71258, 1.54409, 7.176],  [H, -1.71649, 6.06122, 3.496],  
  [H, -0.48093, 2.25518, 3.496],  [H, 2.19742, 5.22823, 3.496],
  [H, 6.10742, 1.54409, 3.496],  [H, 2.19351, 0.71109, 3.496], 
  [H, 3.42907, 4.51714, 3.496],  [H, -2.19742, 5.22823, 7.176],  
  [H, 1.71649, 6.06122, 7.176],  [H, 0.48093, 2.25518, 7.176],
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
            // la maille est monoclinique
            tracer_maille( i * 7.82 -j * 3.91 , j * 6.772  , k * 7.36);
        }
    }
}

// desiner une échelle au pied du cristal
var el_echelle = document.createElement("a-box");
el_echelle.setAttribute("color", "ForestGreen");
el_echelle.setAttribute("depth", "1.0");
el_echelle.setAttribute("height", "0.25");
el_echelle.setAttribute("width", "10");
el_echelle.setAttribute("position", "" + (-0.5 * x_max + 5) + " "+ (-0.5 * y_max) + " " +  (z_max * 0.5 + 3)  );
document.querySelector("a-scene").appendChild(el_echelle);


