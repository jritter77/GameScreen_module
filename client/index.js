
import { CompositeObject } from "../screen_module/objects/CompositeObject.js";
import { GameScreen } from "../screen_module/GameScreen.js";
import { PhysicsObject } from "../screen_module/objects/PhysicsObject.js";
import { SolidObject } from "../screen_module/objects/SolidObject.js";
import { ScreenGrid } from "../screen_module/objects/ScreenGrid.js";
import { CollisionObject } from "../screen_module/objects/CollisionObject.js";

function Page() {
    const screen = new GameScreen();

    $('#app').append(screen.canvas);

    screen.animationStart();
    
    const test = new SolidObject(screen, 128, 128, 64, 64);
    test.target = screen.mouse;
    test.follow = true;
    test.moveable = true;

    test.mouseDown = () => {
        test.speed = 5;
    }

    test.mouseUp = () => {
        test.speed = 0;
    }

    const solid = new SolidObject(screen, 256, 256, 256, 64);

    

    

}


Page();