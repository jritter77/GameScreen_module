
import { Draw } from "./Draw.js";
import { MouseInput } from "./MouseInput.js";


class GameScreen {
    

    constructor() {
        this.width = 800;
        this.height = 480;

        this.scale = 1.00
        this.xOffset = 0;
        this.yOffset = 0;

        this.canvas = $(`<canvas width=${this.width} height=${this.height} style="background-color: black">`)[0];
        this.draw = new Draw(this.canvas);
        this.mouse = new MouseInput(this);
        this.objects = [];
        this.masks = [];

        this.animationStart();
    }


    animationStart() {
        this.paused = false;
        this.animationLoop();
    }

    animationPause() {
        this.paused = true;
    }

    animationLoop() {
        if (this.paused) {
            return;
        }

        this.draw.clearScreen();

        this.scaledMouseX = (this.mouse.x - this.xOffset)/this.scale;
	    this.scaledMouseY = (this.mouse.y - this.yOffset)/this.scale;

        this.updateObjects();

        this.drawBackground();
        this.drawMiddleground();
        this.drawForeground();

        requestAnimationFrame(() => this.animationLoop());
    }

    updateObjects() {
        for (let obj of this.objects) {
            obj.update();
        }
    }


    drawBackground() {
        for (let obj of this.objects) {
            obj.drawBackground();
        }
    }

    drawMiddleground() {
        for (let obj of this.objects) {
            obj.drawMiddleground();
        }
    }

    drawForeground() {
        this.mouse.dispMouseCoord();
        for (let obj of this.objects) {
            obj.drawForeground();
        }
    }

    

    


}

export {GameScreen}