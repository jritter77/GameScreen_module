
/**
 * SCREEN OBJECT
 * 
 * Most basic object to be used with GameScreen.
 * 
 * Has basic variables and methods used by all types of screen objects. 
 * 
 */

class ScreenObject {

    constructor(screen, x, y) {
        this.screen = screen;
        this.x = x;
        this.y = y;
        this.ancestry = this.getAncestry();

        this.mousePressed = false;

        this.screenFollow = false;

        this.addToScreen();
    }


    // This method is called every animation frame for all current screen objects,
    // Used for updating variables.
    update() {
        this.scaledX = (this.x + this.screen.xOffset/this.screen.scale)*this.screen.scale;
        this.scaledY = (this.y + this.screen.yOffset/this.screen.scale)*this.screen.scale;

        if (this.screenFollow) {
            this.focus();
        }
    }



    // Draw Methods, each is called every frame for each object

    drawBackground() {

    }

    drawMiddleground() {

    }

    drawForeground() {

    }

    
    // Adds the ScreenObject to the GameScreen's list of current objects
    addToScreen() {
        this.screen.objects.push(this);
    }

    // Removes the ScreenObject from the GameScreen's list of current objects
    removeFromScreen() {
        this.screen.objects.splice(this.screen.objects.indexOf(this), 1);
    }

    // Returns an array containing all inherited types up to ScreenObject
    getAncestry() {
        this.types = [];
        parent = this;
        while (this.types.indexOf('ScreenObject') < 0) {
            parent = Object.getPrototypeOf(parent);
            this.types.push(parent.constructor.name);
        }
        
        return this.types;
    }


    // Centers the camera on the object
    focus() {
        this.screen.xOffset = -this.x  * this.screen.scale + this.screen.width/2;
        this.screen.yOffset = -this.y  * this.screen.scale + this.screen.height/2;
    }

    mouseDown() {
        this.mousePressed = true;
    }

    mouseUp() {
        this.mousePressed = false;
    }
    
}

export {ScreenObject}