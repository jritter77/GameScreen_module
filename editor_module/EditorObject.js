import { Clickable } from "../screen_module/interfaces/Clickable.js";
import { PhysicsObject } from "../screen_module/objects/PhysicsObject.js";
import { ScreenObject } from "../screen_module/objects/ScreenObject.js";
import { SolidObject } from "../screen_module/objects/SolidObject.js";
import { Editor } from "./Editor.js";

class EditorObject extends ScreenObject {

    static topClicked;

    constructor(editor, rep, x, y) {
        super(editor.screen, x, y);
        
        this.editor = editor;
        this.rep = rep;
        this.repObj = Editor.ObjectList[rep];

        this.width = this.repObj.width;
        this.height = this.repObj.height;

        Clickable.call(this, -this.width/2, -this.height/2);

        this.setMouseDown(() => {EditorObject.topClicked = this});
        this.setMouseUp(() => {EditorObject.topClicked = null});

        
    }

    update() {
        super.update();
        if (EditorObject.topClicked === this) {

            if (this.editor.deleteButton.delete) {
                this.removeFromEditor();
                this.removeFromScreen();
            }

            this.x = Math.floor(this.screen.scaledMouseX/this.editor.snap)*this.editor.snap;
            this.y = Math.floor(this.screen.scaledMouseY/this.editor.snap)*this.editor.snap;
        }
    }

    drawMiddleground() {
        this.screen.draw.polyRect(this.scaledX, this.scaledY, this.width*this.screen.scale, this.height*this.screen.scale, 0, this.repObj.color);
        this.screen.draw.text(this.scaledX-this.width*this.screen.scale/2, this.scaledY-this.height*this.screen.scale/2-8, this.rep);
    }


    removeFromEditor() {
        this.editor.objects.splice(this.editor.objects.indexOf(this), 1);
    }


}


class TestObject extends PhysicsObject {

    static width = 64;
    static height = 64;
    static color = 'red';

    constructor(screen, x, y) {
        super(screen, x, y, TestObject.width, TestObject.height);
        this.weight = 10;
        this.drawColor = TestObject.color;
    }

    mouseDown() {
        this.speed = 5;
    }

    mouseUp() {
        this.speed = 0;
    }


}

class TestObject2 extends PhysicsObject {

    static width = 32;
    static height = 32;
    static color = 'orange';

    constructor(screen, x, y) {
        super(screen, x, y, TestObject2.width, TestObject2.height);
        this.weight = 1;
        this.friction = .01;
        this.elastic = true;
        this.drawColor = TestObject2.color;
    }

    


}


class TestObject3 extends SolidObject {

    static width = 128;
    static height = 64;
    static color = 'blue';

    constructor(screen, x, y) {
        super(screen, x, y, TestObject3.width, TestObject3.height);
        this.drawColor = TestObject3.color;
    }


}

export {EditorObject, TestObject, TestObject2, TestObject3}