
import { CompositeObject } from "../screen_module/objects/CompositeObject.js";
import { GameScreen } from "../screen_module/GameScreen.js";
import { PhysicsObject } from "../screen_module/objects/PhysicsObject.js";
import { SolidObject } from "../screen_module/objects/SolidObject.js";
import { ScreenGrid } from "../screen_module/objects/ScreenGrid.js";
import { CollisionObject } from "../screen_module/objects/CollisionObject.js";
import { Editor } from "../editor_module/Editor.js";
import { Button } from "../screen_module/components/Button.js";
import { TextBox } from "../screen_module/components/TextBox.js";
import { Menu } from "../screen_module/components/Menu.js";

function Page() {
    const screen = new GameScreen();

    $('#app').append(screen.canvas);

    screen.animationStart();

    const defaultList = [{obj: 'testObject', x: 128, y: 128}, {obj: 'testObject', x: 256, y: 256}];
    
    localStorage.setItem('default', JSON.stringify(defaultList));

    const editor = new Editor(screen, 0, 0);

    const testList = JSON.parse(localStorage.getItem('testList'));

    editor.loadObjects(testList);

    const mouseCoords = new TextBox(screen, 0, 0, "99999999999\n\n");
    mouseCoords.update = () => {
        mouseCoords.msg = `X: ${screen.scaledMouseX}\nY: ${screen.scaledMouseY}`;
    }



}


Page();