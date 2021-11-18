import { ScreenObject } from "./ScreenObject.js";
import { Calc } from "../Calc.js";


/**
 * MOTION OBJECT
 * 
 * Child of ScreenObject
 * 
 * Has variables and methods used to move object around screen
 */

class MotionObject extends ScreenObject {

    static RIGHT = 0;
    static LEFT = Math.PI;
    static DOWN = Math.PI/2;
    static UP = 3*Math.PI/2;

    constructor(screen, x, y, speed=0, direction=0) {
        super(screen, x, y);

        this.speed = speed;
        this.direction = direction;

        this.follow = false;
        this.target = null;
    }

    

    update() {

        super.update();
        this.move();

    }


    // Causes the object to move according to speed and direction
    move() {

        // Check if object is currently following a target, set motion towards target if true
        if (this.follow) {

            if (!this.target.x || !this.target.y) {
                return;
            }

            if (this.target === this.screen.mouse) {
                this.moveTowardsPoint(this.screen.scaledMouseX, this.screen.scaledMouseY, this.speed);
            }
            else {
                this.moveTowardsPoint(this.target.x , this.target.y, this.speed);
            }
            
        }

        // update objects position
        this.x = this.x + this.speed * Math.cos(this.direction);
        this.y = this.y + this.speed * Math.sin(this.direction);

    }


    // Moves object to given coordinate
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    // Snaps object to nearest rounded coordinate
    snapTo(x, y, cellsize) {
        this.x = Math.round(x/cellsize) * cellsize;
        this.y = Math.round(y/cellsize) * cellsize;
    }

    // Sets the speed and direction of the object
    setMotion(speed, dir) {
        this.speed = speed;
        this.direction = dir;
    }

    // Stops ths object from moving
    stopMotion() {
        this.speed = 0;
    }

    // Sets the objects speed and points direction towards given point
    moveTowardsPoint(x, y, speed) {
        const dir = Calc.getDir(this.x, this.y, x, y);
        this.setMotion(speed, dir);
    }

    // Sets the object to follow a target object
    setFollow(target, speed) {
        this.follow = true;
        this.speed = speed;
        this.target = target;
    }
    


}

export {MotionObject}