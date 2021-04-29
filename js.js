var THREE = require('three');
var TWEEN = createjs.Tween;
const globals = require('./GLOBALS.js');
const model_importer = require('./model_imports.js')
/* var GLTFLoader = require('./node_modules/three/examples/js/loaders/GLTFLoader') */
var GLTFLoader = require('three-gltf-loader');
/* const imp = require('./import.js') */


const steps = []

console.log("loaded")
let camera, renderer;
let lobster;

let canvas;


let text1, text2;


let sidebar;



const loader = new GLTFLoader()

window.onload = () => {
    let mobile = isMobile();


    sidebar = document.getElementById('sidebar');
    sidebar.addEventListener('onclick', () => {
        console.log("ASFGsr")
        open_sidebar();
    })


    createjs.Ticker.framerate = 60;

    text1 = document.getElementById('text1')
    text1.style.opacity = 0;
    text2 = document.getElementById('text2')
    text2.style.opacity = 0;
    let bg = document.getElementById('bg');

    /* document.getElementById("bg").style.backgroundImage = "blue" */
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    import_lobster();

    camera.position.z = 2.5;
    const light = new THREE.PointLight('#ffffff', 1);
    light.position.z = 3;
    light.position.x = 2;
    light.position.y = 2;
    scene.add(light)

    /* const ambient = new THREE.AmbientLight('#ffffff');
    scene.add(ambient) */


    document.body.appendChild(renderer.domElement);
    console.log("scene loaded")
    render()


    /* console.log(scene) */
    canvas = document.getElementsByTagName('canvas')[0]
}

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    /* console.log(camera.position) */
})



let scroll = 0;


document.onwheel = e => {
    scroll += e.deltaY * .1;
    /* console.log(scroll); */
    let style = "linear-gradient(0deg,rgb(0,162,255) " + scroll * .1 + ("%, rgb(183, 0, 255) " + (scroll + 100) * .1 + "%);");
    /* style = "linear-gradient(0deg, rgb(0, 162, 255) 0%, rgb(183, 0, 255) 100%)" */
    /* style = "blue" */
    document.styleSheets[0].cssRules[1].background = style;
    bg.style.background = style;
    bg.style.display = "none"
    bg.style.display = "block"
    /* document.body.style.background = style */
    /* console.log(style) */
    /* console.log(bg.style.backgroundImage); */
    /* var blue = "blue" */
    /*  bg.style.backgroundImage = "blue" */
    /* console.log(`${blue}`) */
}

window.onclick = e => {
    /* const tw = TWEEN.get(lobster.position)
        .to({
            x: 1,
            y: 0
            }, 500,createjs.Ease.quadIn).to({x:0}, 500, createjs.Ease.quadIn);
            console.log(e) */

    switch (e.target) {
        case canvas:
            stepPlayer.nextStep()
            break;
        case sidebar:
            open_sidebar();
            break;
    }

}


//////////////////// Main render loop
var then, dt, fps;
let models_initialized = false;
then = Date.now();
const render = () => {
    renderer.render(scene, camera);
    if (lobster) lobster.rotation.y += .001 * dt;

    stepPlayer.currentLoop()

    requestAnimationFrame(render)
    dt = Date.now() - then;
    then = Date.now()
}
////////////////////

const testMat = new THREE.MeshBasicMaterial({
    color: 'green'
})
const antennaeMat = new THREE.MeshToonMaterial({
    color: 'black'
})
const bodyTone = new THREE.DataTexture(
    // 0,128,255
    // 0, 51,102, 153,204,255
    // 0, 
    /* Uint8Array.from([0, 0, 0, 128, 128, 128, 255, 255, 255]), 3, 1, THREE.RGBFormat */
    /* Uint8Array.from([0, 0, 0, 51, 51, 51, 102, 102, 102, 153, 153, 153, 204, 204, 204, 255, 255, 255]), 3, 1, THREE.RGBFormat */
    /* Uint8Array.from([0, 0, 0, 63, 63, 63, 120, 120, 120, 180, 180, 180, 255, 255, 255]), 3, 1, THREE.RGBFormat */
    /* Uint8Array.from([0, 0, 0, 32, 32, 32, 64, 64, 64, 128, 128, 128, 200, 200, 200, 210, 210, 210, 255, 255, 255]), 3, 1, THREE.RGBFormat */
    Uint8Array.from([75, 75, 75, 75, 75, 75, 75, 75, 75, 160, 160, 160, 160, 160, 160, 200, 200, 200, 200, 220, 200, 255, 255, 255]), 8, 1, THREE.RGBFormat
);
const lobsterMat = new THREE.MeshToonMaterial({
    color: '#ff1231',
    gradientMap: bodyTone
})
const eyeTone = new THREE.DataTexture(
    Uint8Array.from([0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
        255, 255, 255
    ]),
    32, 1, THREE.RGBFormat
);
const eyeMat = new THREE.MeshToonMaterial({
    color: '#ffffff',
    gradientMap: eyeTone
})
console.log(lobsterMat)

const import_lobster = () => {
    loader.load('./assets/lobster_export.glb', gltf => {
        lobster = gltf.scene;
        stepPlayer.lobster = lobster
        lobster.children[0].children[4].material = antennaeMat // antennae
        lobster.children[0].children[5] // body ?
        lobster.children[0].children[19].material = eyeMat;
        var parser = new MeshMaterialParser(lobster.children[0].children[5].material, lobster);
        for (obj of parser.foundObjects) {
            /* console.log(obj) */
            obj.material = lobsterMat;
        }

        lobster.position.y = 7;
        lobster.position.z = -1;

        scene.add(lobster);
        stepPlayer.nextStep()
    }, xhr => {
        console.log(xhr.loaded / xhr.total * 100 + "%")
    }, error => {
        console.log(error)
    })
}


class MeshMaterialParser {
    constructor(material, object) {
        this.targetMaterial = material
        this.object = object
        this.foundObjects = []

        this.parse(this.object);
    }

    parse(object) {
        /* console.log(object.name) */
        for (var child of object.children) {
            if (child.material == this.targetMaterial) this.foundObjects.push(child);
            if (child.children) this.parse(child);
        }
    }
}



let sidebar_open = false;

function open_sidebar() {

    if (sidebar_open) {
        //TURN OFF
        sidebar.style.width = "5%";
        sidebar.style.backgroundColor = "rgba(0,0,0,0)";
        sidebar.style.backdropFilter = "blur(0px)";
    } else {
        //TURN ON
        sidebar.style.width = "60%";
        sidebar.style.backgroundColor = "rgba(0,0,0,.2)";
        sidebar.style.backdropFilter = "blur(20px)";
        sidebar.onmouseleave = () => {
            open_sidebar();
            sidebar.onmouseleave = null;
        }

    }
    sidebar_open = !sidebar_open
}

function isMobile() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}