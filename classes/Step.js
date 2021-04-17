const TWEEN = createjs.Tween;
class Step {
    constructor() {
        this.text = "You should probably consult a real recipe for this.";
        this.smallText = "";
        this.dyk = "Lobsters are magical."

        this.lobsterPos = {
            x: 0,
            y: 0,
            z: 0
        };

        this.setup = () => {
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
        this.steps = []
        this.i = -1;
        this.usingText1 = true;
        this.lobster

        this.currentLoop = () => {}
    }

    nextStep() {
        // are we overflowing ?
        if (this.i < this.steps.length - 1) {
            //cleanup
            if (this.steps >= 0) this.steps[this.i].after();

            this.i++;
            console.log("going to step n°" + this.i);
            //setup
            this.steps[this.i].setup();
            //move lobster
            this.moveLobster(this.steps[this.i]);
            //replace text
            this.replaceText(this.steps[this.i]);
            //loop
            this.currentLoop = this.steps[this.i].loop
        } else {
            this.i = -1
            this.nextStep()
        }

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

    moveLobster(step){
        const t = TWEEN.get(this.lobster.position)
        .to(step.lobsterPos, 500, createjs.Ease.cubicInOut)
    }
}

let stepPlayer = new StepPlayer();

let step = new Step();
step.text = "Thermidor Lobster is a meal that is prepared using a Lobster."
step.lobsterPos.y = 7;
step.lobsterPos.z = -1;
step.setup = () => {
    console.log("landing")
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "You can buy lobsters on shopping websites, such as AliExpress or Wish."
step.lobsterPos.z = -1;
step.setup = () => {
    console.log("landing")
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "We do not recommend buying lobsters on Wish. AliExpress is fine, though."
step.lobsterPos.z = 0;
step.setup = () => {
    console.log("landing")
}
stepPlayer.steps.push(step);

step = new Step();
step.text = "First, put the wine and shallot into a pan, bring to the boil and simmer until nearly dry."
step.lobsterPos.y = -7;
step.setup = () => {
    console.log("landing")
}
stepPlayer.steps.push(step);