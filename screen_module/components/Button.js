import { Calc } from "../Calc.js";
import { TextBox } from "./TextBox.js";

class Button extends TextBox {
    constructor(screen, x, y, msg) {
        super(screen, x, y, msg);

        this.clickedColor = "white";
    }

    mouseDown = (e) => {
        if (this.checkMouse()) {
            this.bgColor = this.clickedColor;
        }
    };

    mouseUp = (e) => {
        this.bgColor = "grey";
    }

    checkMouse() {
        return Calc.pointInRect(this.screen.mouse.pos.x, this.screen.mouse.pos.y, this.x, this.y, this.width, this.height);
    }

    setMouseDown(foo) {
        this.mouseDown = (e) => {
            if (this.checkMouse()) {
                this.bgColor = this.clickedColor;
                foo();
            }
        }
    }

    setMouseUp(foo) {
        this.mouseUp = (e) => {
            this.bgColor = "grey";
            if (this.checkMouse()) {
                foo();
            }
        }
    }

    
}

export {Button}