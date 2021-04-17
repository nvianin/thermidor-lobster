const ingredients = {};

class Ingredient {
    constructor(name, source) {
        this.name = name;
        this.source = source;
    }
    load() {
        loader.load(source, gltf=>{
            ingredients[this.name] = gltf.scene;
            stepPlayer[this.name] = ingredients[this.name];

        })
    }
}