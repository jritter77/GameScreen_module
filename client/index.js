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



    

    




    const test = new PhysicsObject(screen, 256, 256, 64, 64);
    test.sides = 3;
    test.collisionMask.sides = 3;
    test.weight = 20;
    

    test.mouseDown = e => {
        test.target = screen.mouse;
        test.follow = true;
        test.acceleration = .5;
    }

    test.mouseUp = e => {
        test.acceleration = 0;
    }

    
    
    const solid = new PhysicsObject(screen, 312, 128, 64, 64);
    solid.drawColor = 'purple';
    solid.weight = 20;
    solid.moveable = true;
    solid.elasticicity = .5;

    


    const box = new PhysicsObject(screen, 480, 128);
    box.moveable = true;
    box.direction = Math.PI/4;
    box.drawColor = 'white';
    box.weight = 5;
    box.elasticicity = 1;

    const box2 = new SolidObject(screen, 128, 128, 128, 128);
    box2.direction = Math.PI/4;
    box2.drawColor = 'white';
   


    screen.animationStart();


}


Page();