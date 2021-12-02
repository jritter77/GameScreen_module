

class MouseInput {
    
    constructor(screen) {
        this.screen = screen;
        this.pos = {x: 0, y: 0};			//initialize mouse mouse_position
        this.setMouseListeners();
    }
    
    mouseMoveHandler(e) {				
        //triggers whenever mouse is moved
        this.mousePosHandler(e)
    }
    
    
    mouseDownHandler(e){				
        //triggers anytime mouse is clicked
        for (let obj of this.screen.objects.slice(0, this.screen.objects.length)) {
            if (obj.mouseDown) {
                if (obj.active) {
                    obj.mouseDown(e);
                }
            }
        }
    }
    
    
    mouseUpHandler(e){				
        //triggers anytime mouse is released
        for (let obj of this.screen.objects.slice(0, this.screen.objects.length)) {
            if (obj.mouseUp) {
                if (obj.active) {
                    obj.mouseUp(e);
                }
            }
        }
    }
    
    wheelHandler(e){
        e.preventDefault();

        if (e.deltaY < 0 && this.screen.scale < 3){
            //scroll up code here
            this.screen.scale += .05;

            this.screen.xOffset += ((this.screen.mouse.x - this.screen.xOffset)/this.screen.scale - this.screen.scaledMouseX)*this.screen.scale;
		    this.screen.yOffset += ((this.screen.mouse.y - this.screen.yOffset)/this.screen.scale - this.screen.scaledMouseY)*this.screen.scale;
        }
        else if (e.deltaY > 0 && this.screen.scale > .2){
            //scroll down code here
            this.screen.scale -= .05;
            
            this.screen.xOffset += ((this.screen.mouse.x - this.screen.xOffset)/this.screen.scale - this.screen.scaledMouseX)*this.screen.scale;
		    this.screen.yOffset += ((this.screen.mouse.y - this.screen.yOffset)/this.screen.scale - this.screen.scaledMouseY)*this.screen.scale;
        }
    }
    
    
    
    
    mousePosHandler(e) {
        const canvas = this.screen.canvas;
        var rect = canvas.getBoundingClientRect();
        this.pos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        this.x = this.pos.x;
        this.y = this.pos.y;
    }
    
    
    getMousePos() {
        return this.pos;
    }
    
    setMouseListeners() {
        const canvas = this.screen.canvas;
        canvas.addEventListener("mousemove", (e) => this.mouseMoveHandler(e), false);
        canvas.addEventListener("mousedown", (e) => this.mouseDownHandler(e), false);
        canvas.addEventListener("mouseup", (e) => this.mouseUpHandler(e), false);
        canvas.addEventListener("wheel", (e) => this.wheelHandler(e), false);
    }

    dispMouseCoord(){					
        this.screen.draw.text(32, 32, `x: ${Math.round(this.pos.x)}, y: ${Math.round(this.pos.y)}`, 'white');
    }
}

export {MouseInput}