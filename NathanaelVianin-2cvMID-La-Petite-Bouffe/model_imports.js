 const GLTFLoader = require('three-gltf-loader');
 const THREE = require('THREE')
 const loader = new GLTFLoader();
 const texLoader = new THREE.TextureLoader();

 let assets = []

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

 const threeTone = new THREE.DataTexture(Uint8Array.from([33, 33, 33, 128, 128, 128, 255, 255, 255]), 3, 1, THREE.RGBFormat);

 const lobsterMat = new THREE.MeshToonMaterial({
     color: '#ff3f26',
     gradientMap: bodyTone
 })

 const cookedLobsterMat = new THREE.MeshToonMaterial({
     color: '#ff0408',
     gradientMap: bodyTone
 })

 /* setInterval(() => {
     console.log(onion);
 }, 500) */

 const onion_body_color = texLoader.load('assets/textures/onion_body_base_color.png')
 onion_body_color.flipY = false
 const onion_piece_base_color = texLoader.load('assets/textures/onion_piece_base_color.png')
 onion_piece_base_color.flipY = false
 const onion_shell_base_color = texLoader.load('assets/textures/onion_shell_base_color.png')
 onion_shell_base_color.flipY = false
 const onion_shell_bump = texLoader.load('assets/textures/onion_shell_bump.png')
 onion_shell_bump.flipY = false
 onion_shell_bump.minFilter = THREE.LinearMipMapLinearFilter;
 onion_shell_bump.magFilter = THREE.LinearMipMapLinearFilter;
 const pan_bump = texLoader.load('assets/textures/pan_bump.png')
 pan_bump.flipY = false;
 const pan_color = texLoader.load('assets/textures/pan_color.png')
 pan_color.flipY = false;
 const saw_base_color = texLoader.load('assets/textures/saw_base_color.png')
 saw_base_color.flipY = false
 const saw_roughness = texLoader.load('assets/textures/saw_roughness.png')
 saw_roughness.flipY = false
 const spoon_spice_base_color = texLoader.load('assets/textures/spoon_spice_base_color.png')
 spoon_spice_base_color.flipY = false

 const debugTexture = texLoader.load('assets/textures/debug.jpg');

 let cup_half, cup_half_liquid, cup_full, cup_full_liquid;

 let onion, onion_shell, onion_pieces;
 let pan, pan_liquid, saw
 let spoon, spoon_spice, spoon_flakes;

 let yolk;

 let lobster_cracked, lobster_meat;
 let claw_cracked, claw_meat;

 let models_loaded = false;

 let loadCount = 0;
 let successCount = 0;

 let default_pos = new THREE.Vector3(0, -5, 0);

 /* module.exports = () => {
     if (loadCount == successCount && scene) {
         return {
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
             assets,
         }
     } else {
         setTimeout(module.exports, 100);
     }
} */
 let fucking_load;

 module.exports = {
     cup_half,
     cup_half_liquid,
     cup_full,
     cup_full_liquid,
     onion,
     onion_shell,
     onion_pieces,
     pan,
     pan_liquid,
     saw,
     spoon,
     spoon_spice,
     spoon_flakes,
     /* lobster_cracked,
     lobster_meat,
     claw_cracked,
     claw_meat, */
     models_loaded,
     assets,
     fucking_load,
     successCount,
     loadCount
 }

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

         cup_half.position.copy(default_pos)
         cup_half_liquid.position.copy(default_pos)
         cup_full.position.copy(default_pos)
         cup_half_liquid.position.copy(default_pos)

         /* module.exports.cup_half = cup_half;
         module.exports.cup_half_liquid = cup_half_liquid
         module.exports.cup_full = cup_half;
         module.exports.cup_full_liquid = cup_half_liquid */

         successCount++;
     }
 }, err => {
     console.log(err)
 })
 loadCount++
 loader.load('./assets/onion.glb', gltf => {
     console.log("onion", gltf)

     const onion_mat = new THREE.MeshStandardMaterial({
         map: onion_body_color
     });
     const onion_pieces_mat = new THREE.MeshStandardMaterial({
         map: onion_piece_base_color
         /* color: 0xf9fab9 */
     })
     const onion_shell_mat = new THREE.MeshStandardMaterial({
         map: onion_shell_base_color,
         bumpMap: onion_shell_bump
     })

     onion_pieces = gltf.scene.children[0];
     onion = gltf.scene.children[1];
     onion_shell = gltf.scene.children[2];



     onion.rotation.x = Math.PI

     onion_pieces.material = onion_pieces_mat;
     for (let child of onion_pieces.children) {
         child.material = onion_pieces_mat
     }
     onion.material = onion_mat;
     onion_shell.material = onion_shell_mat;

     onion_pieces.position.copy(default_pos)
     onion.position.copy(default_pos)
     onion_shell.position.copy(default_pos)

     onion_pieces.scale.set(.3, .3, .3)
     onion.scale.set(.3, .3, .3)
     onion_shell.scale.set(.3, .3, .3)

     module.exports.onion_pieces = onion_pieces;
     module.exports.onion = onion;
     module.exports.onion_shell = onion_shell;

     /* scene.add(onion_pieces);
     scene.add(onion);
     scene.add(onion_shell) */
     assets.push(onion_pieces);
     assets.push(onion);
     assets.push(onion_shell)
     successCount++;
 }, err => {
     console.log(err)
 })
 loadCount++
 loader.load('assets/pan.glb', gltf => {
     pan = gltf.scene.children[0];

     /* const cast_iron_mat = new THREE.MeshToonMaterial({
         color: 'darkgrey'
     });
     const handle_mat = new THREE.MeshToonMaterial({
         color: 'lightblue'
     }); */
     const panMat = new THREE.MeshToonMaterial({
         bumpScale: .03,
         bumpMap: pan_bump,
         map: pan_color,
         gradientMap: threeTone

     })

     pan.children[0].material = panMat;
     pan.children[1].material = panMat;

     pan.position.copy(default_pos)
     /* pan.position.set(0, 0, 0); */

     /* module.exports.pan = pan; */

     /* console.log(pan) */

     assets.push(pan);
     successCount++;
 }, err => {
     console.log(err)
 })
 loadCount++
 loader.load('assets/pan_liquid.glb', gltf => {
     pan_liquid = gltf.scene.children[0];

     const pan_liquid_mat = new THREE.MeshStandardMaterial({
         color: 0xffff99,
         morphTargets: true

     })

     pan_liquid.material = pan_liquid_mat;

     pan_liquid.position.set(0, 0, 0)
     pan_liquid.position.copy(default_pos)
     /* pan_liquid.parent = pan; */

     /* module.exports.saw = saw; */

     assets.push(pan_liquid);
     successCount++;
 }, err => {
     console.log(err)
 })
 loadCount++
 loader.load('assets/lobster_crackable.glb', gltf => {
     console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
     console.log(gltf);

     claw_cracked = gltf.scene.children[2];
     claw_meat = gltf.scene.children[4];
     lobster_cracked = gltf.scene.children[5];
     lobster_meat = gltf.scene.children[3];

     claw_cracked.material = cookedLobsterMat;
     lobster_cracked.material = cookedLobsterMat;
     for (child of lobster_cracked.children) {
         child.material = cookedLobsterMat;
     }

     /* const panMat = new THREE.MeshToonMaterial({
         bumpScale: 0,
         bumpMap: pan_bump,
         map: pan_color
     }) */

     /* putChildrenAtOrigin(claw_cracked); */

     /* module.exports.pan = pan; */

     /* console.log(pan) */

     claw_cracked.position.copy(default_pos);
     claw_meat.position.copy(default_pos);
     lobster_cracked.position.copy(default_pos);
     lobster_meat.position.copy(default_pos);


     assets.push(claw_cracked);
     assets.push(claw_meat);
     assets.push(lobster_cracked);
     assets.push(lobster_meat);
     successCount++;
 }, err => {
     console.log(err)
 })
 loadCount++
 loader.load('assets/saw.glb', gltf => {
     saw = gltf.scene.children[0];

     const sawMat = new THREE.MeshStandardMaterial({
         map: saw_base_color,
         metalness: 1,
         roughnessMap: saw_roughness
     })

     saw.material = sawMat;

     saw.position.set(0, 0, 0)
     saw.position.copy(default_pos)

     /* module.exports.saw = saw; */

     assets.push(saw);
     successCount++;
 }, err => {
     console.log(err)
 })
 loadCount++
 loader.load('assets/yolk.glb', gltf => {
     yolk = gltf.scene.children[0];

     /* const yolkMat = new THREE.MeshStandardMaterial({
         map: saw_base_color,
         metalness: 1,
         roughnessMap: saw_roughness
     }) */

     /* saw.material = sawMat; */
     yolk.scale.set(.15, .15, .15)

     yolk.position.set(0, 0, 0)
     /* yolk.position.copy(default_pos) */
     yolk.rotation.x = Math.PI / 2

     /* module.exports.saw = saw; */

     assets.push(yolk);
     successCount++;
 }, err => {
     console.log(err)
 })
 loadCount++
 loader.load('assets/spoon.glb', gltf => {

     console.log(gltf.scene)

     const spoon_mat = new THREE.MeshToonMaterial({
         color: 'lightgrey'
     });
     const spoon_spice_mat = new THREE.MeshToonMaterial({
         map: spoon_spice_base_color
     });
     const spoon_flake_mat = new THREE.MeshToonMaterial({
         map: spoon_spice_base_color
     });


     spoon = gltf.scene.children[1];
     spoon_spice = gltf.scene.children[0];
     spoon_flakes = gltf.scene.children[0].children;

     spoon.material = spoon_mat;
     spoon_spice.material = spoon_spice_mat;
     let o = new THREE.Object3D();
     o.children = spoon_flakes;
     spoon_flakes = o;
     console.log(spoon_flakes)
     for (var flake of spoon_flakes.children) {
         flake.material = spoon_flake_mat;
     }

     spoon.position.copy(default_pos)
     spoon.rotation.set(0, 0, 0)
     spoon_spice.position.copy(default_pos)
     console.log("FUCK THIS SHIT")
     console.log(spoon_flakes);
     spoon_flakes.position.copy(default_pos)
     spoon_flakes.name = "spoon_flakes"

     console.log(spoon)
     models_loaded = true;

     module.exports.spoon_flakes = spoon_flakes

     assets.push(spoon)
     assets.push(spoon_spice)
     assets.push(spoon_flakes)



     successCount++;


     module.exports.fucking_load = setInterval(() => {
         console.log("trying to load")
         if (scene && successCount == loadCount) {
             console.log("achieved loading " + successCount + " out of " + loadCount + " model")

             models_loaded = true;

             pan.position.clone(default_pos)

             for (var obj of assets) {
                 console.log(obj.type)

                 obj.position.clone(default_pos)
                 putChildrenAtOrigin(obj)
                 if (obj.type == "Mesh" || true) {
                     scene.add(obj)
                 }

                 module.exports[obj.name] = obj;
             }

             clearInterval(module.exports.fucking_load)
         }

     }, 1000)
     /* module.exports.fucking_load = fucking_load */

 }, err => {
     console.log(err)
 })


 function putChildrenAtOrigin(object) {
     for (child of object.children) {
         child.position.set(0, 0, 0);
     }
 }