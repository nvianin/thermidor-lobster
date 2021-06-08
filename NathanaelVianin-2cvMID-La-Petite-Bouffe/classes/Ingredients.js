const ingredients = {};

class Ingredient {
    constructor(name, source) {
        this.name = name;
        this.source = source;
        this.object;
        this.action = () => {}

        /* this.load() */
        ingredients[this.name] = this;
    }
    load() {
        loader.load(this.source, gltf => {
            this.object = gltf.scene;
            stepPlayer[this.name] = ingredients[this.name];
        }, xhr => {
            console.log(xhr.loaded + " out of " + xhr.total + " loaded");
        }, error => {
            console.log(error);
        })
    }
}

new Ingredient('butter', )