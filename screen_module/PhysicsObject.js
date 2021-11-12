import { Calc } from "./Calc.js";
import { SolidObject } from "./SolidObject.js";

class PhysicsObject extends SolidObject {
    constructor(screen, x, y, width=32, height=32, speed=0, direction=0) {
        super(screen, x, y, width, height, speed, direction)

        this.weight = 1;
        this.drag = 1;

        this.acceleration = 0;
        this.turnSpeed = 5;

        this.hspeed = 0;
        this.vspeed = 0;


        this.setCollisionEvent('PhysicsObject', (other) => this.physCollision(other));
    }

    move() {

        // Check if object is currently following a target
        if (this.follow) {

            if (!this.target.x || !this.target.y) {
                return;
            }

            if (this.target === this.screen.mouse) {
                this.rotateTowards(this.screen.scaledMouseX, this.screen.scaledMouseY);
            }
            else {
                this.rotateTowards(this.target.x , this.target.y);
            }
            
        }


        if (this.acceleration) {
            this.hspeed += this.acceleration * Math.cos(this.direction);
            this.vspeed += this.acceleration * Math.sin(this.direction);
        }
        else {
            this.hspeed /= 1.1;
            this.vspeed /= 1.1;
        }

        if (this.hspeed > 10) {
            this.hspeed = 10;
        }
        else if (this.hspeed < -10) {
            this.hspeed = -10;
        }

        if (this.vspeed > 10) {
            this.vspeed = 10;
        }
        else if (this.vspeed < -10) {
            this.vspeed = -10;
        }
        
        

        this.x += this.hspeed;
        this.y += this.vspeed;
    }


    rotateTowards(x, y) {
        let dir = Calc.getDir(x, y, this.x, this.y);
        
        if (this.direction > Math.PI*2) {
            this.direction -= Math.PI*2;
        }

        if (this.direction < 0) {
            this.direction += Math.PI*2;
        }

        let diff = this.direction - dir;

        if (Math.abs(Math.PI - Math.abs(diff)) > Math.PI/180*2) {
            if (Math.sin(diff) < 0) {
                this.direction -= this.turnSpeed*Math.PI/180;
            }
            else {
                this.direction += this.turnSpeed*Math.PI/180;
            }
        }
        
    }

    physCollision(other) {
        
        const force = other.weight * (Math.sqrt(other.hspeed**2+other.vspeed**2));
        const dir = Calc.getDir(other.x, other.y, this.x, this.y);

        console.log(force/this.weight);
        this.hspeed += (force / this.weight) * Math.cos(dir);
        this.vspeed += (force / this.weight) * Math.sin(dir);

        
    }
}

export {PhysicsObject}