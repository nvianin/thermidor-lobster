/* var GLTFLoader = require('three-gltf-loader');
const loader = new GLTFLoader() */

const antennaeMat = new THREE.MeshToonMaterial()

const import_lobster = (scene) => {
    var lobster;
    loader.load('./assets/lobster_export.glb', gltf => {
        lobster = gltf.scene;
        lobster.children[0].children[4].material = antennaeMat // antennae
        lobster.children[0].children[5] // body ?

        scene.add(lobster);
    }, xhr => {
        console.log(xhr.loaded / xhr.total * 100 + "%")
    }, error => {
        console.log(error)
    })

}

module.exports = {
    import_lobster
}