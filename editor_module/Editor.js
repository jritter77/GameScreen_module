import { Button } from "../screen_module/components/Button.js";
import { Clickable } from "../screen_module/interfaces/Clickable.js";
import { PhysicsObject } from "../screen_module/objects/PhysicsObject.js";
import { ScreenObject } from "../screen_module/objects/ScreenObject.js";
import { SolidObject } from "../screen_module/objects/SolidObject";
import { DeleteButton } from "./DeleteButton.js";
import { EditorObject, TestObject, TestObject2, TestObject3 } from "./EditorObject.js";
import { LoadButton } from "./LoadButton.js";
import { ObjectMenu } from "./ObjectMenu.js";
import { SaveButton } from "./SaveButton.js";
import { TestButton } from "./TestButton.js";




class Editor extends ScreenObject {

    static ObjectList = {
        testObject: TestObject,
        testObject2: TestObject2,
        testObject3: TestObject3
    };

    constructor(screen, x, y) {
        super(screen, x, y);
        
        this.objects = [];
        this.snap = 16;


        this.saveButton = new SaveButton(this);
        this.loadButton = new LoadButton(this);
        this.testButton = new TestButton(this);
        this.objectMenu = new ObjectMenu(this);
        this.deleteButton = new DeleteButton(this);

        
    }

    addEditorObject(objectType, x, y) {
        const obj = new EditorObject(this, objectType, x, y);
        this.objects.push(obj);
        return obj;
    }

    removeEditorObjects() {
        for (let obj of this.objects) {
            obj.removeFromScreen();
        }
    }


    // Loads EditorObjects from a list stored in localStorage
    loadObjects(objectList) {

        this.removeEditorObjects();

        this.objects = [];

        for (let obj of objectList) {
            this.objects.push(new EditorObject(this, obj.obj, obj.x, obj.y));    
        }
    }


    // Saves EditorObjects to a list in localStorage
    getObjectList() {
        const objectList = [];

        for (let obj of this.objects) {
            objectList.push({obj: obj.rep, x: obj.x, y: obj.y});
        }

        return objectList;
    }



    // Create real objects from their EditorObject counterparts
    testObjects() {
        const objects = [];

        for (let obj of this.objects) {
            objects.push(new obj.repObj(this.screen, obj.x, obj.y));
        }

        return objects;
    }

    

}





export {Editor}