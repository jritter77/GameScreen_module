
import { Draw } from "./Draw.js";
import { MouseInput } from "./MouseInput.js";

/**
 * GAME SCREEN
 * 
 * This uses a canvas element to create an animated screen.
 * 
 * Contains methods for calling and managing the various animation events. 
 * 
 * @param {Draw} draw Drawing on the screen is achieved by using methods in the screen's Draw object. 
 * @param {MouseInput} mouse User Input can be detected with methods held in screen's the MouseInput object.
 * @param {Array} objects Holds all current screen objects.
 * @param {Array} masks Holds all current collision masks.  
 */


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


    // Starts the animation loop
    animationStart() {
        this.paused = false;
        this.lastFrame = Date.now();
        this.animationLoop();
    }

    // Pauses the animation loop
    animationPause() {
        this.paused = true;
    }

    // Calls all animation loop events in specified order.
    animationLoop() {
        if (this.paused) {
            return;
        }

        const curFrame = Date.now();                        // timestamp the current frame
        const elapsed = curFrame - this.lastFrame;          // Calculate time elapsed since previous frame

        if (elapsed > this.interval) {                      // Only perform animation loop if enough time has passed

            // Clears canvas before redraw
            this.draw.clearScreen();

            // Computes the coordinates of the mouse on the screen relative to the screen's offset and scale
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



    // Calls update event for all current screen objects
    updateObjects() {
        for (let obj of this.objects) {
            obj.update();
        }
    }


    // Calls collision event (if present) for all screen objects
    processCollisions() {
        for (let obj of this.objects) {
            if (obj.collision) {
                obj.collisionMask.checkCollision();
                obj.collision();
            }
        }
    }


    // Calls respective draw events for all current screen objects

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