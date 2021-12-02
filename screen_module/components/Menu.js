import { ScreenObject } from "../objects/ScreenObject.js";
import { Button } from "./Button.js";

class Menu extends ScreenObject {
    
    options = {
        submenu1: {
            option1: 'option1',
            option2: 'option2',
            option3: 'option3',
        }, 
        submenu2: {
            option1: 'option1',
            option2: 'option2',
        }, 
        submenu3: {
            option1: 'option1',
            option2: 'option2',
            option3: 'option3',
            option4: 'option4',
        }, 
    }

    buttons = [];

    current = 0;
    maxOptions = 3;

    buttonHeight = 48;
    buttonWidth = 128;


    constructor(screen, x, y) {
        super(screen, x, y);

        this.currentNode = this.options;
        this.previousNode = this.currentNode;
        this.navigate(this.options);
    }

    

    createButtons(root) {
        const children = Object.keys(root);
        const start = this.current;
        const end = Math.min(start + this.maxOptions, children.length);

        let yOffset = 0;

        if (root !== this.options) {
            const btn = new Button(this.screen, this.x, this.y+this.buttonHeight*yOffset, "back");
            btn.height = this.buttonHeight;
            btn.width = this.buttonWidth;
            this.buttons.push(btn);

            btn.setMouseUp(() => this.navigate(this.previousNode));

            yOffset++;

        }

        if (this.current > 0) {
            const btn = new Button(this.screen, this.x, this.y+this.buttonHeight*yOffset, "^");
            btn.height = this.buttonHeight;
            btn.width = this.buttonWidth;
            this.buttons.push(btn);

            btn.setMouseUp(() => {
                this.current -= this.maxOptions;
                this.navigate(root);
            });

            yOffset++;

        }

        for (let c=start; c<end; c++) {
            const option = children[c];
            const btn = new Button(this.screen, this.x, this.y+this.buttonHeight*yOffset, option);
            btn.height = this.buttonHeight;
            btn.width = this.buttonWidth;
            this.buttons.push(btn);

            if (root[option].constructor.name === "Object") {
                btn.setMouseUp(() => this.navigate(root[option]));
            } 
            else {
                btn.setMouseDown(() => this.menuAction(btn));
            }
            

            yOffset++;

        }


        if (end < children.length) {
            const btn = new Button(this.screen, this.x, this.y+this.buttonHeight*yOffset, "v");
            btn.height = this.buttonHeight;
            btn.width = this.buttonWidth;
            this.buttons.push(btn);

            btn.setMouseUp(() => {
                this.current += this.maxOptions;
                this.navigate(root);
            });

            yOffset++;

        }

        
    }


    navigate(root) {


        for (let btn of this.buttons) {
            btn.removeFromScreen();
        }

        this.buttons = [];

        if (root !== this.currentNode) {
            this.previousNode = this.currentNode;
            this.current = 0;
        } else {
            this.previousNode = this.previousNode;
        } 

        this.createButtons(root);
        

        this.currentNode = root;

    }

    menuAction(btn) {
        console.log("You Clicked " + this.currentNode[btn.msg]);
    }
    

}






export {Menu}