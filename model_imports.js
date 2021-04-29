const GLTFLoader = require('three-gltf-loader');
const THREE = require('THREE')
const loader = new GLTFLoader();

const assets = []

let cup_half, cup_half_liquid, cup_full, cup_full_liquid;

let onion, onion_shell, onion_pieces;
let pan, saw
let spoon, spoon_spice, spoon_flakes;


let models_loaded = false;

let loadCount = 0;
let successCount = 0;

loadCount++
loader.load('./assets/cup.glb', gltf => {
    {
        const cup_liquid_mat = new THREE.MeshStandardMaterial({
            opacity: .45,
            transparent: true,
            color: 'yellow'
        })
        const cup_mat = new THREE.MeshStandardMaterial({
            opacity: .3,
            transparent: true,
            color: "white",
            depthTest: false
        })
        /* console.log(gltf) */

        cup_half = gltf.scene.children[0];
        cup_half.material = cup_mat;
        cup_full = gltf.scene.children[1];
        cup_full.material = cup_mat;


        cup_half_liquid = gltf.scene.children[2];
        cup_half_liquid.material = cup_liquid_mat;
        cup_full_liquid = gltf.scene.children[3];
        cup_full_liquid.material = cup_liquid_mat;

        /* scene.add(cup_half);
        scene.add(cup_half_liquid);
        scene.add(cup_full);
        scene.add(cup_full_liquid); */
        assets.push(cup_half);
        assets.push(cup_half_liquid);
        assets.push(cup_full);
        assets.push(cup_full_liquid);

        cup_half.position.set(-1, 0, 0);
        cup_half_liquid.position.set(-1, 0, 0)
        cup_full.position.set(-.75, 0, 0);
        cup_half_liquid.position.set(-.75, 0, 0);

        successCount++;
    }
})
loadCount++
loader.load('./assets/onion.glb', gltf => {
    console.log(gltf)

    const onion_mat = new THREE.MeshStandardMaterial({
        color: 'yellow'
    });
    const onion_pieces_mat = new THREE.MeshStandardMaterial({
        color: 'yellow'
    })
    const onion_shell_mat = new THREE.MeshStandardMaterial({
        color: 'brown'
    })

    onion_pieces = gltf.scene.children[0];
    onion = gltf.scene.children[1];
    onion_shell = gltf.scene.children[2];

    onion_pieces.material = onion_pieces_mat;
    onion.material = onion_mat;
    onion_shell.material = onion_shell_mat;

    onion_pieces.position.set(0, 0, 0);
    onion.position.set(0, 0, 0)
    onion_shell.position.set(0, 0, 0)

    /* scene.add(onion_pieces);
    scene.add(onion);
    scene.add(onion_shell) */
    assets.push(onion_pieces);
    assets.push(onion);
    assets.push(onion_shell)
    successCount++;
})
loadCount++
loader.load('assets/pan.glb', gltf => {
    pan = gltf.scene.children[0];

    const cast_iron_mat = new THREE.MeshToonMaterial({
        color: 'darkgrey'
    });
    const handle_mat = new THREE.MeshToonMaterial({
        color: 'lightblue'
    });

    pan.children[0].material = cast_iron_mat;
    pan.children[1].material = handle_mat;

    pan.position.set(0, 0, 0);

    /* console.log(pan) */

    assets.push(pan);
    successCount++;
})
loadCount++
loader.load('assets/saw.glb', gltf => {
    saw = gltf.scene.children[0];

    const sawMat = new THREE.MeshStandardMaterial({
        color: 'grey',
        metalness: 1,
        roughness: .6
    })

    saw.material = sawMat;

    saw.position.set(0, 0, 0);

    assets.push(saw);
    successCount++;
})
loadCount++
loader.load('assets/spoon.glb', gltf => {

    console.log(gltf.scene)

    const spoon_mat = new THREE.MeshToonMaterial({
        color: 'lightgrey'
    });
    const spoon_spice_mat = new THREE.MeshToonMaterial({
        color: 'green'
    });
    const spoon_flake_mat = new THREE.MeshToonMaterial({
        color: 'green'
    });

    spoon = gltf.scene.children[1];
    spoon_spice = gltf.scene.children[0];
    spoon_flakes = gltf.scene.children[0].children;

    for (var flake of spoon_flakes) {
        flake.material = spoon_flake_mat;
    }

    models_loaded = true;

    assets.push(spoon)
    assets.push(spoon_spice)
    assets.push(spoon_flakes)


    successCount++;


    let fucking_load = setInterval(() => {
        console.log("trying to load")
        if (scene && successCount == loadCount) {

            for (var obj of assets) {
                console.log(obj.type)
                if (obj.type == "Mesh") {
                    scene.add(obj)
                }
            }
            clearInterval(fucking_load)
        }

    }, 10)
})

//
module.exports = {
    cup_half,
    cup_half_liquid,
    cup_full,
    cup_full_liquid,
    onion,
    onion_shell,
    onion_pieces,
    pan,
    saw,
    spoon,
    spoon_spice,
    spoon_flakes,
    models_loaded,
    assets
}