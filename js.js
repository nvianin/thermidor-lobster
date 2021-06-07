THREE = require('three');
var TWEEN = createjs.Tween;
const globals = require('./GLOBALS.js');
models = require('./model_imports.js')

/* EffectComposer = require('./node_modules/three/examples/js/postprocessing/EffectComposer')
let RenderPass = require('./node_modules/three/examples/js/postprocessing/RenderPass')
let SSAOPass = require('./node_modules/three/examples/js/postprocessing/SSAOPass') */


stepPlayer.models = models;

/* var GLTFLoader = require('./node_modules/three/examples/js/loaders/GLTFLoader') */
var GLTFLoader = require('three-gltf-loader');
/* const imp = require('./import.js') */

const steps = []

console.log("loaded")
let camera, renderer;
let renderpass, effectpass, fxaapass;

let lobster;

let canvas;


let text1, text2;

let dyk;
let sidebar;

let mouseReleased = false;



const loader = new GLTFLoader()

window.onload = () => {
    let mobile = isMobile();

    dyk = document.getElementById('dyk_container');

    sidebar = document.getElementById('sidebar');
    let i = 0;
    for (var step of stepPlayer.steps) {
        if (step.isImportant) {
            console.log(step)
            /* if (i > 0) sidebar.innerHTML += "<br>" */
            let le = document.createElement('li');
            le.classList.add("sidebar_element");

            let id = stepPlayer.steps.map(e => {
                return e.text
            }).indexOf(step.text);
            le.id = id
            le.onclick = () => {
                stepPlayer.changeStep(le.id);
                console.log("going to step " + le.id)
            }

            if (step.shortText) {
                le.innerHTML += step.shortText
            } else {
                le.innerHTML += step.text
            }
            sidebar.appendChild(le);

            i++;
        }
    }



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
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;


    composer = new THREE.EffectComposer(renderer);
    renderpass = new THREE.RenderPass(scene, camera);
    SAOPass = new THREE.SAOPass(scene, camera, false, true);

    composer.addPass(renderpass);
    SAOPass.setSize(window.innerWidth, window.innerHeight);

    SAOPass.params.saoBlurRadius = 16;
    SAOPass.params.saoIntensity = .01
    SAOPass.params.saoKernelRadius = 50;
    SAOPass.params.saoScale = 6;
    /* console.log(SAOPass.params) */

    composer.addPass(SAOPass)

    fxaapass = new THREE.ShaderPass(THREE.FXAAShader)
    let copyPass = new THREE.ShaderPass(THREE.CopyShader);

    composer.addPass(copyPass);
    const pixelRatio = renderer.getPixelRatio();

    fxaapass.material.uniforms['resolution'].value.x = 1 / (window.innerWidth * pixelRatio)
    fxaapass.material.uniforms['resolution'].value.y = 1 / (window.innerHeight * pixelRatio)

    composer.addPass(fxaapass)

    import_lobster();

    camera.position.z = 2.5;
    const light = new THREE.PointLight('#ffffff', 1);
    light.position.z = 3;
    light.position.x = 2;
    light.position.y = 2;
    scene.add(light)

    const ambient = new THREE.AmbientLight({
        color: 0xeeffee,
    }, .15)
    scene.add(ambient)

    debugCube = new THREE.Mesh(new THREE.BoxGeometry(.1, .1, .1), new THREE.MeshBasicMaterial({
        color: "purple"
    }))
    /* scene.add(debugCube); */

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
    SAOPass.setSize(window.innerWidth, window.innerHeight);
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

let raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.onpointerup = e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    mouse.y *= -1;

    mouseReleased = true;
}

window.onpointerdown = e => {

    /* const tw = TWEEN.get(lobster.position)
        .to({
            x: 1,
            y: 0
            }, 500,createjs.Ease.quadIn).to({x:0}, 500, createjs.Ease.quadIn);
            console.log(e) */


    console.log(e.target)
    switch (e.target) {
        case canvas:

            /* debugCube.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z); */
            /* console.log(intersects[0].point) */

            if (intersects.length == 0) {
                stepPlayer.nextStep()
            }

            break;
        case sidebar:
            open_sidebar();
            break;
    }

}

let mouseX, mouseY;
mouseX = mouseY = 0;

window.onmousemove = e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}


//////////////////// Main render loop
var then, dt, fps;
let frameCount = 0;
let models_initialized = false;
then = Date.now();

let intersects = []

const render = () => {

    mouse.x = (mouseX / window.innerWidth) * 2 - 1;
    mouse.y = (mouseY / window.innerHeight) * 2 - 1;
    mouse.y *= -1;

    frameCount++;
    /* renderer.render(scene, camera); */
    composer.render()
    if (lobster) lobster.rotation.y += .001 * dt;

    stepPlayer.currentLoop()

    raycaster.setFromCamera(mouse, camera);
    /* let raycastable = getObjectsInChildren(scene.children); */
    let raycastable = fuckingGetObjects(scene);

    intersects = raycaster.intersectObjects(raycastable);

    /* if (frameCount % 10 == 0) {
        console.log(intersects)
        console.log(raycastable)
    } */

    for (let i of intersects) {
        let target = i.object;
        if (i.object.type == "SkinnedMesh") {
            if (i.object.parent.name == "Armature") {
                /* console.log(i.object.parent.parent); */
                target = i.object.parent.parent;
            }
        }
        if (target.onclick) {
            if (frameCount % 100 == 0) console.log(target.name)
            document.body.style.cursor = "pointer";
            if (mouseReleased) {
                target.onclick();
            }
            activated = true;
        } else if (target.onclick == null) {
            /* console.log("reset cursor to default") */
            document.body.style.cursor = "default"
            if (frameCount % 100 == 0) {
                console.log(target)
                /* target.position.y = 100; */
            }
        }
        break;
    }
    if (intersects.length == 0) {
        /* console.log("reset cursor to default") */
        document.body.style.cursor = "default"
    }



    /* if (models.models_loaded) {
        for (var ass of model_importer.assets) {
            if (ass.type == "Mesh") {
                ass.rotation.y += .001 * dt;
            }
        }
        console.log(cup_half)
    } */

    requestAnimationFrame(render)
    dt = Date.now() - then;
    then = Date.now()

    mouseReleased = false;
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
//color: '#ff1231',
const lobsterMat = new THREE.MeshToonMaterial({
    color: '#ff3f26',
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
        lobster.name = "lobster"
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

        lobster.onclick = () => {
            const tw = TWEEN.get(lobster.scale)
                .to({
                    x: 1.1,
                    y: 1.1,
                    z: 1.1
                }, 333, createjs.Ease.backIn)
                .call(() => {
                    const tw2 = TWEEN.get(lobster.scale)
                        .to({
                            x: 1,
                            y: 1,
                            z: 1
                        }, 333, createjs.Ease.backOut)
                })

            const tw2 = TWEEN.get(lobster.rotation)
                .to({
                    x: lobster.rotation.x + Math.PI * 2,
                    y: lobster.rotation.y,
                    z: lobster.rotation.z
                }, 500, createjs.Ease.quadInOut)
        }

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
        sidebar.style.width = "28px";
        sidebar.style.backgroundColor = "rgba(0,0,0,0)";
        sidebar.style.backdropFilter = "blur(0px)";
        sidebar.style.cursor = "pointer";
        /* sidebar.style.left = "98%"; */
    } else {
        //TURN ON
        sidebar.style.width = "60%";
        /* sidebar.style.left = "auto"; */
        sidebar.style.backgroundColor = "rgba(0,0,0,.2)";
        sidebar.style.backdropFilter = "blur(20px)";
        sidebar.onmouseleave = () => {
            if (sidebar_open) {
                open_sidebar();
            }
            sidebar.onmouseleave = null;

        }
        sidebar.style.cursor = "default";

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


function getObjectsInChildren(children) {
    let return_objects = []
    /* if (frameCount % 100 == 0) console.log(children) */
    if (children[0]) {
        for (child of children) {
            switch (child.type) {
                case "Mesh":
                    return_objects.push(child);
                    break;
                case "Scene":
                    return_objects = return_objects.concat(child.children);
                    break;
            }
        }
    }
    return return_objects;
}

function fuckingGetObjects(parent) {
    let fuck = []
    for (child of parent.children) {
        fuck.push(child);
        if (child.children) {
            fuck = fuck.concat(fuckingGetObjects(child));
        }
    }
    return fuck;
}