import { Calc } from "../Calc.js";
import { CollisionObject } from "./CollisionObject.js";

class SolidObject extends CollisionObject {

    constructor(screen, x, y, width = 32, height = 32, speed = 0, direction = 0) {
        super(screen, x, y, width, height, speed, direction);

        this.moveable = false;

        this.setCollisionEvent('SolidObject', (other) => this.solidCollision(other))
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
                this.moveTowardsPoint(this.target.x, this.target.y, this.speed);
            }

        }


        this.hspeed = this.speed * Math.cos(this.direction);
        this.vspeed = this.speed * Math.sin(this.direction);

        this.checkCollsionAhead();

        // update objects position
        this.x += this.hspeed;
        this.y += this.vspeed;

    }


    solidCollision(other) {

        if (other.moveable && !other.ancestry.includes('PhysicsObject')) {
            other.moveTo(other.x + this.hspeed, other.y + this.vspeed);
        }
    
        if (this.moveable) {
            const dir = Calc.getDir(other.x, other.y, this.x, this.y);
            this.moveTo(this.x + Math.cos(dir)*5, this.y + Math.sin(dir)*5);
        }  
        
        

    }

    checkCollsionAhead() {
        if (this.moveable) {

            const buffer = this.collisionMask.cellSize * 2;
            const hmod = (this.hspeed !== 0) ? this.hspeed/Math.abs(this.hspeed) : 1;
            const vmod = (this.vspeed !== 0) ? this.vspeed/Math.abs(this.vspeed) : 1;
            

            if (this.hspeed !== 0) {
                const collisions = this.collisionMask.checkCollisionAt(this.x + this.hspeed + buffer*hmod, this.y);
                for (let c of collisions) {
                    if (c.ancestry.includes('SolidObject')) {
                        if (!c.moveable) {
                            this.hspeed = 0;
                        }
                    }
                }
            }
        

            if (this.vspeed !== 0) {
                const collisions = this.collisionMask.checkCollisionAt(this.x, this.y + this.vspeed + buffer*vmod);
                for (let c of collisions) {
                    if (c.ancestry.includes('SolidObject')) {
                        if (!c.moveable) {
                            this.vspeed = 0;
                        }

                    }
                }
            } 

        }

    }


}

export { SolidObject }