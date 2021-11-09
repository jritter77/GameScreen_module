import { CollisionMask } from "../screen_module/CollisionMask.js";
import { CollisionObject } from "../screen_module/CollisionObject.js";
import { GameScreen } from "../screen_module/GameScreen.js";
import { MotionObject } from "../screen_module/MotionObject.js";

function Page() {
    const screen = new GameScreen();

    $('#app').append(screen.canvas);

    

    const test = new CollisionObject(screen, 256, 256);
    

    test.mouseDown = e => {
        test.setFollow(screen.mouse, 2);
    }

    test.mouseUp = e => {
        test.stopMotion();
    }

    

    const test2 = new CollisionObject(screen, 128, 128, 64, 64);
    


    screen.animationStart();

    

}


Page();