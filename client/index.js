import { CollisionMask } from "../screen_module/CollisionMask.js";
import { CollisionObject } from "../screen_module/CollisionObject.js";
import { GameScreen } from "../screen_module/GameScreen.js";
import { MotionObject } from "../screen_module/MotionObject.js";
import { SolidObject } from "../screen_module/SolidObject.js";

function Page() {
    const screen = new GameScreen();

    $('#app').append(screen.canvas);

    

    const phaseable = new CollisionObject(screen, 128, 128, 128, 128);

    phaseable.sides = 6;
    phaseable.collisionMask.sides = 6;

    phaseable.drawColor = 'blue';

    phaseable.setCollisionEvent('SolidObject', (other) => {
        if (other === box) {
            phaseable.drawColor = 'green';
        }
        else {
            phaseable.drawColor = 'blue';
        }
    })




    const test = new SolidObject(screen, 256, 256, 64, 64);

    test.sides = 3;
    test.collisionMask.sides = 3;
    

    test.mouseDown = e => {
        test.setFollow(screen.mouse, 2);
    }

    test.mouseUp = e => {
        test.stopMotion();
    }

    
    
    const solid = new SolidObject(screen, 312, 128, 64, 64);

    solid.drawColor = 'purple';

    


    const box = new SolidObject(screen, 480, 128);
    box.moveable = true;
    box.direction = Math.PI/4;

    box.drawColor = 'white';

    screen.animationStart();


}


Page();