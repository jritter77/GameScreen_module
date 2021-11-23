import {Calc} from "../Calc.js";

function Clickable(xOffset=0, yOffset=0) {

    this.checkMouse = () => {
        return Calc.pointInRect(this.screen.scaledMouseX, this.screen.scaledMouseY, this.x+xOffset, this.y+yOffset, this.width, this.height);
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