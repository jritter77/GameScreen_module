import { Button } from "../screen_module/components/Button.js";

class TestButton extends Button {

    constructor(editor) {
        super(editor.screen, 0, 0, "Test");

        this.editor = editor;
        
        this.x = editor.loadButton.x + editor.loadButton.width;
        this.y = this.screen.height-this.height;

        this.createdObjects = [];

        this.setMouseDown(() => this.testRun());
    }

    update() {
        super.update();
        this.x = this.editor.loadButton.x + this.editor.loadButton.width;
        this.y = this.screen.height-this.height;
    }

    startTestRun() {
        this.preTest = this.editor.getObjectList();
        this.editor.removeEditorObjects();
        this.createdObjects = this.editor.testObjects();
        this.editor.saveButton.active = false;
        this.editor.loadButton.active = false;
        this.editor.deleteButton.active = false;
        this.editor.objectMenu.active = false;
        this.msg = "End";

    }

    endTestRun() {

        for (let obj of this.createdObjects) {
            obj.removeFromScreen();
        }

        this.createdObjects = [];

        this.editor.loadObjects(this.preTest);
        this.editor.saveButton.active = true;
        this.editor.loadButton.active = true;
        this.editor.deleteButton.active = true;
        this.editor.objectMenu.active = true;
        this.msg = "Test";

    }


    testRun() {
        if (this.createdObjects.length) {
            this.endTestRun();
        }
        else {
            this.startTestRun();
        }
    }
}

export {TestButton}