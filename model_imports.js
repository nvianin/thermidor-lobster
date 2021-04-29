const GLTFLoader = require('GLTFLoader');
const loader = new GLTFLoader();

let cup_half, cup_half_liquid, cup_full, cup_full_liquid;

let onion, onion_shell, onion_pieces;
let pan, saw
let spoon, spoon_spice, spoon_flakes;


loader.load('./assets/cup.glb', gltf => {
    {
        const cup_liquid_mat = new THREE.MeshStandardMaterial({
            opacity: .5,
            transparent: true,
            color: 'red'
        })
        console.log(gltf)
        cup_half = gltf.scene.children[0];
        cup_full = gltf.scene.children[1];


        cup_half_liquid = gltf.scene.children[2];
        cup_full_liquid = gltf.scene.children[3];
        scene.add(cup_half);
        scene.add(cup_half_liquid);
        scene.add(cup_full);
        scene.add(cup_full_liquid);
        cup_half.position.set(0, 0, 0);
    }
})

module.exports = {
    cup_half,
    cup_half_liquid,
    cup_full,
    cup_full_liquid
}