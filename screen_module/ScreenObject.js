
class ScreenObject {

    constructor(screen, x, y) {
        this.screen = screen;
        this.x = x;
        this.y = y;

        this.addToScreen();
    }

    update() {
        this.scaledX = (this.x + this.screen.xOffset/this.screen.scale)*this.screen.scale;
        this.scaledY = (this.y + this.screen.yOffset/this.screen.scale)*this.screen.scale;
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

    
}

export {ScreenObject}