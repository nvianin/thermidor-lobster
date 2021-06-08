const TWEEN = createjs.Tween;
let models;
let lobster;

let soundLoop
class Step {
    constructor() {
        this.text = "You should probably consult a real recipe for this.";
        this.shortText = null;
        this.dyk = null;
        this.isImportant = false;
        models = this.models;

        this.lobsterPos = {
            x: 0,
            y: 0,
            z: 0
        };

        this.before = () => {
            console.log("empty setup")
        }; //prepare scene

        this.loop = () => {
            /* console.log("empty loop") */
        }; //refresh continuously

        this.after = () => {
            console.log("empty after")
        }; //delete scene


    }
}



class StepPlayer {
    constructor() {
        this.playsSound = true;
        console.log(this.playsSound)
        this.steps = []
        this.i = -1;
        this.usingText1 = true;
        this.lobster

        this.currentLoop = () => {}
    }

    nextStep() {
        if (this.lobster) lobster = this.lobster;
        // are we overflowing ?
        if (this.i < this.steps.length - 1) {
            //cleanup
            if (this.i >= 0) this.steps[this.i].after();

            this.i++;
            console.log("going to step n°" + this.i);
            //setup
            this.steps[this.i].before();
            //move lobster
            this.moveLobster(this.steps[this.i]);
            //replace text
            this.replaceText(this.steps[this.i]);
            //loop
            this.currentLoop = this.steps[this.i].loop
            // replace dyk text
            if (this.steps[this.i].dyk != null) {
                document.getElementById('dyk_text').innerText = this.steps[this.i].dyk
                document.getElementById('dyk_container').style.bottom = "3vh";
            } else {
                document.getElementById('dyk_container').style.bottom = "-" + (document.getElementById('dyk_container').offsetHeight + 200) + "px";
            }

        } else {
            this.i = -1
            this.nextStep()
        }

        this.updateStepList();

    }
    changeStep(stepNumber) {

        // are we overflowing ?
        //cleanup
        if (this.steps >= 0) this.steps[this.i].after();
        this.i = stepNumber;
        console.log("going to step n°" + stepNumber);
        //setup
        this.playsSound = false;
        for (var i = this.i; i > this.steps.length; i++) {
            this.steps[i].before();
            this.steps[i].after();
        }
        for (var i = 0; i < this.i; i++) {
            this.steps[i].before();
            this.steps[i].after();
        }
        this.playsSound = true;
        this.steps[this.i].before();
        //move lobster
        this.moveLobster(this.steps[this.i]);
        //replace text
        this.replaceText(this.steps[this.i]);
        //loop
        this.currentLoop = this.steps[this.i].loop
        // replace dyk text
        if (this.steps[this.i].dyk != null) {
            document.getElementById('dyk_text').innerText = this.steps[this.i].dyk
            document.getElementById('dyk_container').style.bottom = "3.3%";
        } else {
            document.getElementById('dyk_container').style.bottom = "-300px";
        }

        this.updateStepList();

    }

    replaceText(step) {
        if (this.usingText1) {
            console.log(text1)
            let o1 = {
                opacity: 1
            };
            const t = TWEEN.get(o1, {
                    onChange: () => {
                        text1.style.opacity = o1.opacity;
                    }
                })
                .to({
                    opacity: 0
                }, 500, createjs.Ease.quadIn)

            text2.textContent = step.text

            let o2 = {
                opacity: 0
            }
            const t2 = TWEEN.get(o2, {
                    onChange: () => {
                        text2.style.opacity = o2.opacity;
                    }
                })
                .to({
                    opacity: 1
                }, 500, createjs.Ease.quadIn)

            this.usingText1 = false;
        } else {
            let o1 = {
                opacity: 1
            };
            const t = TWEEN.get(o1, {
                    onChange: () => {
                        text2.style.opacity = o1.opacity;
                    }
                })
                .to({
                    opacity: 0
                }, 500, createjs.Ease.quadIn)

            text1.textContent = step.text

            let o2 = {

                opacity: 0
            }
            const t2 = TWEEN.get(o2, {
                    onChange: () => {
                        text1.style.opacity = o2.opacity;
                    }
                })
                .to({
                    opacity: 1
                }, 500, createjs.Ease.quadIn)
            this.usingText1 = true;
        }
        console.log("switched text to " + step.text)
    }

    moveLobster(step) {
        if (step.lobsterPos.x != 0 && step.lobsterPos.y != 0 && step.lobsterPos.z != 0) {
            const t = TWEEN.get(this.lobster.position)
                .to(step.lobsterPos, 500, createjs.Ease.cubicInOut)
        }
    }

    displace_the_lobster(position, length) {
        const t = TWEEN.get(this.lobster.position)
            .to(position, length, createjs.Ease.cubicInOut);
    }

    updateStepList() {
        let s = document.getElementById("sidebar");
        console.log(s.children.length);
        let modified = false;

        for (let i = 0; i < s.children.length; i++) {
            let e = s.children[i];
            if (e.id == this.i) {
                e.classList.add("sidebar_element_active");
            } else if (this.steps[this.i].isImportant) {
                e.classList.remove("sidebar_element_active");
            }
        }
    }
}

let fuckshitfuck = {
    x: 0,
    y: 0,
    z: 0
};

let stepPlayer = new StepPlayer();

let step = new Step();
step.text = "Thermidor Lobster is a meal that is prepared using a Lobster."
step.lobsterPos.y = 0.01;
step.lobsterPos.z = 0;
step.before = () => {
    console.log("landing")
    smoothMove(lobster, {
        x: 0,
        y: 0,
        z: 0
    }, 1000)
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "You can buy lobsters on shopping websites, such as AliExpress or Wish."
/* step.lobsterPos.z = -1; */
step.before = () => {
    /* smoothMove(models.onion, {
        x: 0,
        y: 0,
        z: 0
    }, 2000) */
}
step.dyk = "We do not recommend buying lobsters on Wish. AliExpress bought is fine."
stepPlayer.steps.push(step);

step = new Step();
step.text = "Steam the lobster for 8 minutes. It should be bright red."
step.shortText = "Steam for 8 minutes"
step.isImportant = true;
step.before = () => {
    playSound('../assets/sounds/boil_Steam.mp3')
    /* audio.play() */
    let col = {
        r: 255,
        g: 63,
        b: 38
    }
    const tw = new TWEEN.get(col, {
            onChange: () => {
                stepPlayer.lobster.children[0].children[6].material.color.r = col.r / 255;
                stepPlayer.lobster.children[0].children[6].material.color.g = col.g / 255;
                stepPlayer.lobster.children[0].children[6].material.color.b = col.b / 255;
            }
        })
        .to({
            r: 255,
            g: 4,
            b: 8
        }, 1500, createjs.Ease.quadInOut)
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "When it has cooled down, cut the bottom open and pull out the meat. Claws and tail can be used as well."
step.shortText = "Remove the meat"
step.isImportant = true;
step.dyk = "One lobster claw can exert 100 pounds of pressure per square inch. A claw from a 21 pound lobster is capable of breaking a man's arm."
step.before = () => {
    stepPlayer.displace_the_lobster({
        x: 0,
        y: 10,
        z: 0
    }, 1500);
    smoothMove(models.lobster_cracked, {
        x: 0,
        y: 0,
        z: 0
    })
    smoothMove(models.lobster_meat, {
        x: 0,
        y: 0,
        z: 0
    })

}

step.loop = () => {
    models.lobster_cracked.rotation.y += .005;
    models.lobster_cracked.rotation.z += .005;


    models.lobster_meat.rotation.y += .005;
    models.lobster_meat.rotation.z += .005;
}
step.after = () => {
    smoothMove(models.lobster_cracked, {
        x: 0,
        y: -5,
        z: 0
    })
    smoothMove(models.lobster_meat, {
        x: 0,
        y: -5,
        z: 0
    })
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "Melt the butter in a large pot, and add the onions."
step.shortText = "Prepare the sauce"
step.isImportant = true;
step.onions_follow_pan = false;
step.before = () => {
    let onionParts = [models.onion, models.onion_shell, models.onion_pieces_parent]
    models.pan_liquid.parent = models.pan;
    models.pan_liquid.position.set(0, 0, 0)
    models.pan_liquid.scale.y = .05;
    smoothMove(models.pan, {
        x: 0,
        y: -.3,
        z: 0
    })
    /* smoothMove(models.pan_liquid, {
        x: 0,
        y: -.3,
        z: 0
    }) */
    playSound('../assets/sounds/sizzle.mp3')
    models.pan.rotation.y = Math.PI / 2;
    models.pan.rotation.x = .4;
    /* models.pan_liquid.rotation.x = .4; */

    onionParts.forEach(part => {
        smoothMove(part, {
            x: 0,
            y: .2,
            z: 0
        })
    })


    models.onion_shell.onclick = () => {
        smoothMove(models.onion_shell, {
            x: 0,
            y: 0,
            z: 0
        })
        const t = new TWEEN.get(models.onion_shell.scale)
            .to({
                x: .9,
                y: .1,
                z: .9
            }, 500, createjs.Ease.quadIn).call(() => {
                /* smoothMove(models.onion_shell, {
                    x: 0,
                    y: -5,
                    z: 0
                }) */

                const t = new TWEEN.get(models.onion_shell.scale)
                    .to({
                        x: 0,
                        y: 0,
                        z: 0
                    }, 1000, createjs.Ease.quadIn)
                models.onion_shell.visible = false
            })
        models.onion.onclick = () => {
            smoothScale(models.onion, {
                x: 0,
                y: 0,
                z: 0
            })
        }
    }

    let child_onclick = () => {
        step.onions_follow_pan = true;

        let timer = 100;
        let a = []
        models.onion_pieces.rotation.x = .4
        for (let i = 0; i < models.onion_pieces.children.length; i++) {
            a[i] = {
                x: (Math.random() * 2 - 1) * .03,
                y: (Math.random()) * -.01,
                z: (Math.random() * 2 - 1) * .03
            }
        }
        let hahafuck = setInterval(() => {
            let i = 0
            for (let child of models.onion_pieces.children) {
                child.position.add(a[i])
                a[i].x *= .99;
                a[i].y *= .99;
                a[i].z *= .99;
                i++
            }
            timer--;
            if (timer <= 0) {
                clearInterval(hahafuck);
            }
        }, 25);
    }

    for (let child of models.onion_pieces.children) {
        let range = .4;
        let rand = () => {
            return (Math.random() * 2 - 1) * range
        }
        child.position.set(0, 0, 0);
        child.position.add({
            x: rand(),
            y: rand(),
            z: rand()
        })
        child.rotation.setFromVector3(child.position)
        console.log(child.position)
        child.onclick = child_onclick
    }


}
step.loop = () => {
    models.pan.position.y += Math.sin(Date.now() * .001) * .001
    /* models.onion.rotation.y += .001; */

    if (step.onions_follow_pan) {
        models.onion_pieces.position.y += Math.sin(Date.now() * .001) * .001
    }

    let onionParts = [models.onion, models.onion_pieces, models.onion_shell]
    for (let part of onionParts) {
        part.rotation.y += .001
    }
}
step.after = () => {
    let onionParts = [models.onion, models.onion_shell, models.onion_pieces_parent]
    /* smoothMove(models.pan, {
        x: 0,
        y: -5,
        z: 0
    }) */

    for (let c of models.onion_pieces.children) {
        c.position.set(0, 0, 0);
    }

    onionParts.forEach(part => {
        smoothMove(part, {
            x: 0,
            y: 5,
            z: 0
        })
    })


    setTimeout(() => {
        models.onion_shell.visible = true;
    }, 500)


}
stepPlayer.steps.push(step);

step = new Step();
step.text = "Add the fish stock, wine, double cream and mustard. Boil and cook for about 10 minutes while stirring."
step.shortText = "Prepare the sauce"
step.before = () => {
    smoothRotate(models.pan, {
        x: .4,
        y: 0,
        z: 0
    })
    smoothMove(models.pan, {
        x: 0,
        y: -.5,
        z: 0
    })

    if (soundLoop == undefined) {
        soundLoop = new Audio('../assets/sounds/fry_loop.mp3')
        soundLoop.loop = true;
    }

    models.pan_liquid.onclick = () => {
        smoothScale(models.pan_liquid, {
            x: 1,
            y: .1,
            z: 1
        });
        smoothColor(models.pan_liquid.material, 176, 126, 35)
        playSound('../assets/sounds/fry1.mp3')
        models.pan_liquid.onclick = () => {
            smoothScale(models.pan_liquid, {
                x: 1,
                y: .3,
                z: 1
            });
            smoothColor(models.pan_liquid.material, 224, 168, 54)
            playSound('../assets/sounds/fry2.mp3')
            models.pan_liquid.onclick = () => {
                smoothScale(models.pan_liquid, {
                    x: 1,
                    y: .35,
                    z: 1
                });
                smoothColor(models.pan_liquid.material, 209, 169, 36)
                playSound('../assets/sounds/fry3.mp3')
                models.pan_liquid.onclick = null;
            }
        }
    }
    console.log("FUCKFUCKFUCKFUCKFCK")

}
step.loop = () => {
    models.pan.position.y += Math.sin(Date.now() * .001) * .001
}
step.dyk = "In the 17th century, lobster was not a luxury. Its meat was fed to pigs and there were laws that forbade people from serving it more than three times a week to servants or prisoners."
/* step.before = () => {
    smoothRotate(models.pan, {
        x: .4,
        y: Math.PI / 2,
        z: 0
    });

} */
stepPlayer.steps.push(step);
step = new Step();

step.text = "When the liquid has reduced to a half, place the egg yolk into the pan and heat while whisking."
step.isImportant = true;
step.shortText = "Add the egg"
step.before = () => {
    models.yolk.position.set(0, 5, 0);
    models.yolk.parent = models.pan
    models.yolk.rotation.set(Math.PI / 2, 0, 0)
    models.yolk.scale.set(.15, .15, .15)
    smoothMove(models.yolk, {
        x: 0,
        y: .5,
        z: 0
    })

    models.yolk.onclick = () => {
        smoothScale(models.yolk, {
            x: 1,
            y: 1,
            z: .05
        }, 1000)
        playSound('../assets/sounds/whisking.mp3')
        smoothScale(models.pan_liquid, {
            x: 1,
            y: .4,
            z: 1
        })
        smoothMove(models.yolk, {
            x: -.03,
            y: .14,
            z: 0
        })
        models.yolk.onclick = null;
    }

}
step.loop = () => {
    models.pan.position.y += Math.sin(Date.now() * .001) * .001
}
step.after = () => {
    smoothMove(models.yolk, {
        x: 0,
        y: 5,
        z: 0
    }, 1000)
    smoothScale(models.yolk, {
        x: 0,
        y: 0,
        z: 0
    })
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "When thickened, add the lemon juice and parsley, then salt and pepper to taste."
step.shortText = "Prepare the sauce"
step.loop = () => {
    models.pan.position.y += Math.sin(Date.now() * .001) * .001
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "Add the lobster meat and stir."
step.isImportant = true;
step.shortText = "Add the lobster meat"
step.dyk = "Lobsters are cannibals. They'll happily eat each other if food is scarce. Lobster cannibalism is on the rise and biologists think climate change might be the cause."
step.loop = () => {
    models.pan.position.y += Math.sin(Date.now() * .001) * .001
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "Spoon the meat and sauce back into the shells. Optionally, top with parmesan."
step.isImportant = true;
step.before = () => {
    smoothMove(models.pan, {
        x: 0,
        y: -5,
        z: 0
    });
}
step.shortText = "Spoon the meat and sauce back into the shells"
stepPlayer.steps.push(step);

step = new Step();
step.text = "Broil for 4 to 6 minutes, until golden brown."
step.isImportant = true;
step.dyk = "In Switzerland and some parts of Italy, it is illegal to cook live lobster. They must be stunned or humanely killed."
step.shortText = "Broil"
stepPlayer.steps.push(step);

step = new Step();
step.text = "Serve with garlic toast."
step.isImportant = true;
step.shortText = "Serve"
stepPlayer.steps.push(step);






function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function smoothMove(obj, pos, length = 500) {
    /* let oriPos = obj.position.clone(); */
    let tarPos = pos;
    console.log("smoothly moving " + obj.name + " from " + obj.position.y + " to " + tarPos.y + " over a length of " + length)
    const tw = TWEEN.get(obj.position)
        .to({
            x: tarPos.x,
            y: tarPos.y,
            z: tarPos.z
        }, 500, createjs.Ease.quadInOut);
}

function smoothRotate(obj, rot, length = 500) {
    const tw = TWEEN.get(obj.rotation)
        .to({
            x: rot.x,
            y: rot.y,
            z: rot.z
        }, length, createjs.Ease.quadInOut)
}


function smoothScale(obj, scale, length = 500) {
    const tw = TWEEN.get(obj.scale)
        .to({
            x: scale.x,
            y: scale.y,
            z: scale.z
        }, length, createjs.Ease.quadInOut)
}

function smoothColor(mat, r, g, b, length = 500) {
    let col = {
        r: r,
        g: g,
        b: b
    }
    let oriCol = {
        r: mat.color.r * 255,
        g: mat.color.g * 255,
        b: mat.color.b * 255
    }
    const tw = new TWEEN.get(oriCol, {
            onChange: () => {
                mat.color.r = oriCol.r / 255;
                mat.color.g = oriCol.g / 255;
                mat.color.b = oriCol.b / 255;
            }
        })
        .to({
            r: col.r,
            g: col.g,
            b: col.b,
        }, length, createjs.Ease.quadInOut)
}




let get_lobster;

window.addEventListener('onload', () => {
    get_lobster = () => {
        return lobster;
    }
})

function playSound(sound) {
    let url = sound;
    /* playSound('../assets/sounds/boil_Steam.mp3')
    "https://github.com/nvianin/thermidor-lobster/blob/master/assets/sounds/boil_Steam.mp3?raw=true" */

    url = url.substring(2);
    url = "https://github.com/nvianin/thermidor-lobster/blob/master" + url + "?raw=true"

    sound = url;

    console.log(url)


    if (stepPlayer.playsSound) {
        let audio = new Audio(sound)
        audio.play()
    }
}


/* const tw = TWEEN.get(lobster.position)
    .to({
        x: 0,
        y: 1,
        z: 0
    }, 500, createjs.Ease.quadInOut) */