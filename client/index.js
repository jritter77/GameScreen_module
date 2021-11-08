import { CollisionMask } from "../screen_module/CollisionMask.js";
import { GameScreen } from "../screen_module/GameScreen.js";
import { MotionObject } from "../screen_module/MotionObject.js";

function Page() {
    const screen = new GameScreen();

    $('#app').append(screen.canvas);

    const test2 = new MotionObject(screen, 128, 128);

    test2.collisionMask = new CollisionMask(test2, test2.x, test2.y, 20, 20);
    test2.collisionMask.showMask = true;

    const test = new MotionObject(screen, 256, 256);

    test.mouseDown = e => {
        test.setFollow(screen.mouse, 2);
    }

    test.mouseUp = e => {
        test.stopMotion();
    }

    test.collisionMask = new CollisionMask(test, test.x, test.y, 10, 10);
    test.collisionMask.showMask = true;


    


    screen.animationStart();

    

}


Page();