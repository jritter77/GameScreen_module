
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

        this.fps = 60;
        this.interval = 1000/this.fps;
        this.frameCount = 0;

        this.animationStart();
    }


    animationStart() {
        this.paused = false;
        this.lastFrame = Date.now();
        this.animationLoop();
    }

    animationPause() {
        this.paused = true;
    }

    animationLoop() {
        if (this.paused) {
            return;
        }

        const curFrame = Date.now();
        const elapsed = curFrame - this.lastFrame;

        if (elapsed > this.interval) {

            this.draw.clearScreen();

            this.scaledMouseX = (this.mouse.x - this.xOffset)/this.scale;
            this.scaledMouseY = (this.mouse.y - this.yOffset)/this.scale;

            this.updateObjects();
            this.processCollisions();

            this.drawBackground();
            this.drawMiddleground();
            this.drawForeground();

            this.lastFrame = curFrame;
            this.frameCount++;

        }

        

        requestAnimationFrame(() => this.animationLoop());
    }

    updateObjects() {
        for (let obj of this.objects) {
            obj.update();
        }
    }

    processCollisions() {
        for (let obj of this.objects) {
            if (obj.collision) {
                obj.collision();
            }
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