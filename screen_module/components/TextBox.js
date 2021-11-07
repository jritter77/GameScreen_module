import { ScreenObject } from "../ScreenObject.js";

class TextBox extends ScreenObject {

    constructor(screen, x, y, msg) {
        super(screen, x, y);
        
        this.title = "";
        this.msg = msg;

        this.font = "16px Arial";
        this.color = "white";
        this.align = "center";

        this.bgColor = "grey";
        this.borderWidth = 4;
        this.borderColor = "blue";

        this.getMsgDimensions();
    }


    drawForeground() {

        this.screen.draw.rect(
            this.x, 
            this.y, 
            this.width, 
            this.height, 
            this.borderColor
        );

        this.screen.draw.rect(
            this.x + this.borderWidth, 
            this.y + this.borderWidth, 
            this.width - this.borderWidth*2, 
            this.height - this.borderWidth*2,
            this.bgColor
        );

        this.screen.draw.multiLineText(this.x + this.width/2, this.y + this.height/2, this.msg, this.color, this.align, this.font);

    }

    getMsgDimensions() {
        this.width = this.screen.draw.getStrWidth(this.msg) + parseInt(this.font, 10)*2;
        this.height = this.screen.draw.getStrHeight(this.msg) + parseInt(this.font, 10)*2;
    }

}

export {TextBox}