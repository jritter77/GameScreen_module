import { CollisionMask } from "../screen_module/CollisionMask.js";
import { CollisionObject } from "../screen_module/CollisionObject.js";
import { TextBox } from "../screen_module/components/TextBox.js";
import { GameScreen } from "../screen_module/GameScreen.js";
import { MotionObject } from "../screen_module/MotionObject.js";
import { PhysicsObject } from "../screen_module/PhysicsObject.js";
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




    const test = new PhysicsObject(screen, 256, 256, 64, 64);
    test.sides = 4;
    test.collisionMask.sides = 4;
    test.weight = 50;
    

    test.mouseDown = e => {
        test.target = screen.mouse;
        test.follow = true;
        test.acceleration = .5;
    }

    test.mouseUp = e => {
        test.acceleration = 0;
    }

    
    
    const solid = new SolidObject(screen, 312, 128, 64, 64);
    solid.drawColor = 'purple';

    


    const box = new PhysicsObject(screen, 480, 128);
    box.moveable = true;
    box.direction = Math.PI/4;
    box.drawColor = 'white';
    screen.animationStart();


}


Page();