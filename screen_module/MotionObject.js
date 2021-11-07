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

    drawMiddleground() {
        this.screen.draw.poly(this.scaledX, this.scaledY, 32*this.screen.scale, 4, this.direction);
    }

    update() {
        super.update();

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

        // This is the actual move function
        this.x = this.x + this.speed * Math.cos(this.direction);
        this.y = this.y + this.speed * Math.sin(this.direction);
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
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