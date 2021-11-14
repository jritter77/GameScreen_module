
class ScreenObject {

    constructor(screen, x, y) {
        this.screen = screen;
        this.x = x;
        this.y = y;
        this.ancestry = this.getAncestry();

        this.screenFollow = false;

        this.addToScreen();
    }

    update() {
        this.scaledX = (this.x + this.screen.xOffset/this.screen.scale)*this.screen.scale;
        this.scaledY = (this.y + this.screen.yOffset/this.screen.scale)*this.screen.scale;

        if (this.screenFollow) {
            this.focus();
        }
    }

    drawBackground() {

    }

    drawMiddleground() {

    }

    drawForeground() {

    }

    

    addToScreen() {
        this.screen.objects.push(this);
    }

    removeFromScreen() {
        this.screen.objects.splice(this.screen.objects.indexOf(this), 1);
    }

    getAncestry() {
        this.types = [];
        parent = this;
        while (this.types.indexOf('ScreenObject') < 0) {
            parent = Object.getPrototypeOf(parent);
            this.types.push(parent.constructor.name);
        }
        
        return this.types;
    }

    focus() {
        this.screen.xOffset = -this.x  * this.screen.scale + this.screen.width/2;
        this.screen.yOffset = -this.y  * this.screen.scale + this.screen.height/2;
    }

    
}

export {ScreenObject}