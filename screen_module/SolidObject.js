import { Calc } from "./Calc.js";
import { CollisionObject } from "./CollisionObject.js";

class SolidObject extends CollisionObject {

    constructor(screen, x, y, width=32, height=32, speed=0, direction=0) {
        super(screen, x, y, width, height, speed, direction);

        this.prevX = x;
        this.prevY = y;

        this.moveable = false;

        this.setCollisionEvent('SolidObject', (other) => this.solidCollision(other));
    }

    solidCollision(other) {
        
        const dir = Calc.getDir(other.x, other.y, this.x, this.y);

        this.x = this.x + Math.cos(dir);
        this.y = this.y + Math.sin(dir);

        if (!other.moveable) {
            this.collisionMask.update();
            other.collisionMask.update();
            this.collision();
        }
        

    }
}

export {SolidObject}