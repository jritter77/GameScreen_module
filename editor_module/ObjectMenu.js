import { Menu } from "../screen_module/components/Menu.js";
import { EditorObject, TestObject, TestObject2, TestObject3 } from "./EditorObject.js";

class ObjectMenu extends Menu {

    options = {
        submenu1: {
            testObject: 'testObject',
            testObject2: 'testObject2',
            testObject3: 'testObject3',
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
    
    
    constructor(editor) {
        super(editor.screen, 0, 128);

        this.editor = editor;

        this.currentNode = this.options;
        this.navigate(this.currentNode);
    }
    
    


    menuAction(btn) {
        const objType = this.currentNode[btn.msg];
        const obj = this.editor.addEditorObject(objType, this.screen.scaledMouseX, this.screen.scaledMouseY);
        EditorObject.topClicked = obj;

    }
}

export {ObjectMenu}