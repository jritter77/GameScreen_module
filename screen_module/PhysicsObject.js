import { Calc } from "./Calc.js";
import { SolidObject } from "./SolidObject.js";

class PhysicsObject extends SolidObject {
    constructor(screen, x, y, width=32, height=32, direction=0) {
        super(screen, x, y, width, height, 0, direction)

        this.weight = 1;
        this.drag = 1;

        this.acceleration = 0;
        this.turnSpeed = 10;

        this.hspeed = 0;
        this.vspeed = 0;
        this.maxSpeed = 40;

        this.elasticicity = 0;

        this.moveable = true;


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

        if (this.hspeed > this.maxSpeed) {
            this.hspeed = this.maxSpeed;
        }
        else if (this.hspeed < -this.maxSpeed) {
            this.hspeed = -this.maxSpeed;
        }

        if (this.vspeed > this.maxSpeed) {
            this.vspeed = this.maxSpeed;
        }
        else if (this.vspeed < -this.maxSpeed) {
            this.vspeed = -this.maxSpeed;
        }
        
        this.speed = Math.sqrt(this.hspeed**2 + this.vspeed**2);

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


        if ((Math.abs(Math.PI - Math.abs(diff))) < this.turnSpeed*Math.PI/180) {
            return;
        }

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
        
        const hm = (this.weight * this.hspeed) + (other.weight * other.hspeed);
        const vm = (this.weight * this.vspeed) + (other.weight * other.vspeed);

        const totalWeight = this.weight + other.weight;

        this.hspeed = hm / totalWeight;
        this.vspeed = vm / totalWeight;


        if (this.elasticicity) {
            const dir = Calc.getDir(other.x, other.y, this.x, this.y);

            this.hspeed += ((Math.abs(hm)/this.weight) * Math.cos(dir)) * this.elasticicity;
            this.vspeed += ((Math.abs(vm)/this.weight) * Math.sin(dir)) * this.elasticicity;

            other.hspeed += ((Math.abs(hm)/other.weight) * -Math.cos(dir)) * other.elasticicity;
            other.vspeed += ((Math.abs(vm)/other.weight) * -Math.sin(dir)) * other.elasticicity;
        }
        
        
        
        
    }
}

export {PhysicsObject}