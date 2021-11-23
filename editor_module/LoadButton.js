import { Button } from "../screen_module/components/Button.js";

class LoadButton extends Button {

    constructor(editor) {
        super(editor.screen, 0, 0, "Load");

        this.editor = editor;
        
        this.x = editor.saveButton.x + editor.saveButton.width;
        this.y = this.screen.height-this.height;

        this.setMouseDown(() => this.loadObjects());

    }

    loadObjects() {
        const objectList = JSON.parse(localStorage.getItem('testList'));
        this.editor.loadObjects(objectList);

    }


}

export {LoadButton}