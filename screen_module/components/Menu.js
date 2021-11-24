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

    constructor(screen, x, y) {
        super(screen, x, y);

        this.currentNode = this.options;
        this.navigate(this.options);
    }


    createButtons(root) {
        let i = 0;
        for (let option in root) {
            const btn = new Button(this.screen, this.x, this.y+48*i, option);
            this.buttons.push(btn);

            if (root[option].constructor.name === "Object") {
                btn.setMouseUp(() => this.navigate(root[option]));
            } 
            else {
                btn.setMouseDown(() => this.menuAction(btn));
            }
            

            i++;

        }

        if (root !== this.options) {
            const btn = new Button(this.screen, this.x, this.y+48*i, "back");
            this.buttons.push(btn);

            const prev = this.currentNode;
            btn.setMouseUp(() => this.navigate(prev));

        }
    }


    navigate(root) {

        

        for (let btn of this.buttons) {
            btn.removeFromScreen();
        }

        this.buttons = [];

        this.createButtons(root);
        this.currentNode = root;

    }

    menuAction(btn) {
        console.log("You Clicked " + this.currentNode[btn.msg]);
    }
    

}






export {Menu}