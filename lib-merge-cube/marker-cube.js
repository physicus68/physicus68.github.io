
// numéro, nom et rotation à effectuer 
let faces = [
    { 'num': 1, 'nom': "face_1", 'rot': "-90   0   0 " },
    { 'num': 2, 'nom': "face_2", 'rot': "  0 -90  90 " },
    { 'num': 3, 'nom': "face_3", 'rot': " 90   0 180 " },
    { 'num': 4, 'nom': "face_4", 'rot': "  0  90 -90 " },
    { 'num': 5, 'nom': "face_5", 'rot': "  0   0   0 " }
];

// gestion des faces à afficher
let faceVisible = { face_1: -1, face_2: -1, face_3: -1, face_4: -1, face_5: -1 };

AFRAME.registerComponent('registerevents', {
    init: function () {
        let marker = this.el;
        // le marker est visible
        marker.addEventListener('markerFound', function () {
            faceVisible[marker.id] = performance.now();
            updateFace();
        });
        // le marker n'est plus visible
        marker.addEventListener('markerLost', function () {
            faceVisible[marker.id] = -1;
            updateFace();
        });
        // une seule face sera visible si plusieurs Markers sont actifs
        function updateFace() {
            var affiche = true;
            for (const [key, value] of Object.entries(faceVisible)) {
                if (value > 0) {
                    var el = document.querySelector('#' + key);
                    if (affiche) {
                        el.firstElementChild.setAttribute('visible', true);
                        affiche = false;
                    } else {
                        el.firstElementChild.setAttribute('visible', false);
                    }
                }
            }
        };
    }
});

function createMarkerCube() {    
    chargerModele();    
    // génération du code permettant d'afficher un modele gltf sur un marker avec la bonne orientation
    var entity = document.querySelector('a-marker-cube');
    nomModele = entity.getAttribute("modele");
    // génération du code html
    var html = "";
    faces.forEach(f => {
        html = html + "<a-marker markerhandler type='barcode' value='" + f['num'] + "' \
                id='"+ f['nom'] + "' registerevents> \
            <a-entity animation-mixer='loop:repeat' \
                rotation='"+ f['rot'] + "' position='0 -0.6 0' \
                gltf-model='"+ nomModele + "'> \
            </a-entity> \
        </a-marker>";

    });
    entity.outerHTML = html;
    //console.log();
};

function chargerModele() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const modele = urlParams.get('modele')
    if (modele !== null){
        var entity = document.querySelector('#asset-modele');    
        entity.setAttribute("src",modele+".glb");
        //console.log(entity);
    }
};

window.onload = createMarkerCube;
