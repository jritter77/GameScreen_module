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

        if (this.moveable) {
            if (!other.moveable) {

                this.x = this.x + Math.cos(dir) * ((this.speed > 5) ? this.speed : 5);
                this.y = this.y + Math.sin(dir) * ((this.speed > 5) ? this.speed : 5);
                
                this.collisionMask.update();
                other.collisionMask.update();
                this.collision();
            }
            else {
                this.x = this.x + Math.cos(dir);
                this.y = this.y + Math.sin(dir);
            }
        }
        

        
        

    }
}

export {SolidObject}