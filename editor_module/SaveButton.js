import { Button } from "../screen_module/components/Button.js";

class SaveButton extends Button {

    constructor(editor) {
        super(editor.screen, 0, 0, "Save");

        this.editor = editor;
        
        this.x = this.screen.width-256;
        this.y = this.screen.height-this.height;

        this.setMouseDown(() => this.saveObjects());

    }

    saveObjects() {
        const listname = 'testList';
        const objectList = this.editor.getObjectList(listname);
        localStorage.setItem(listname, JSON.stringify(objectList));
    }



}

export {SaveButton}