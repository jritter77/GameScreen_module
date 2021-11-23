import {Calc} from "../Calc.js";

function Clickable(xOffset=0, yOffset=0) {

    this.checkMouse = () => {
        return Calc.pointInRect(this.screen.scaledMouseX, this.screen.scaledMouseY, this.scaledX+xOffset*this.screen.scale, this.scaledY+yOffset*this.screen.scale, 
            this.width*this.screen.scale, this.height*this.screen.scale);
    }

    this.setMouseDown = (foo) => {
        this.mouseDown = (e) => {
            if (this.checkMouse()) {
                foo(e);
            }
        }
    }

    this.setMouseUp = (foo) => {
        this.mouseUp = (e) => {
            if (this.checkMouse()) {
                foo(e);
            }
        }
    }
}

export {Clickable}