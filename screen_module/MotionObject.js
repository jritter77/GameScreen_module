import { ScreenObject } from "./ScreenObject.js";
import { Calc } from "./Calc.js";


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



    move() {

        // Check if object is currently following a target
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

        this.x = this.x + this.speed * Math.cos(this.direction);
        this.y = this.y + this.speed * Math.sin(this.direction);

    }


    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    snapTo(x, y, cellsize) {
        this.x = Math.round(x/cellsize) * cellsize;
        this.y = Math.round(y/cellsize) * cellsize;
    }

    setMotion(speed, dir) {
        this.speed = speed;
        this.direction = dir;
    }

    stopMotion() {
        this.speed = 0;
    }

    
    moveTowardsPoint(x, y, speed) {
        const dir = Calc.getDir(this.x, this.y, x, y);
        this.setMotion(speed, dir);
    }

    setFollow(target, speed) {
        this.follow = true;
        this.speed = speed;
        this.target = target;
    }


}

export {MotionObject}