
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
    
    const test = new PhysicsObject(screen, 128, 128, 64, 64);
    test.target = screen.mouse;
    test.follow = true;
    test.moveable = true;
    test.weight = 50;

    test.mouseDown = () => {
        test.speed = 5;
    }

    test.mouseUp = () => {
        test.speed = 0;
    }

    const heavy = new SolidObject(screen, 256, 256, 256, 64);
    heavy.weight = 10;

    const med = new PhysicsObject(screen, 512, 128, 64, 64);
    med.weight = 5;
    med.moveable = true;
    med.elastic = true;
    med.friction = .03;

    const light = new PhysicsObject(screen, 320, 128);
    light.weight = 5;
    light.moveable = true;
    light.friction = .01;
    light.elastic = true;
    
    

}


Page();