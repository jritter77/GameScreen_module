import { Calc } from "../Calc.js";
import { SolidObject } from "./SolidObject.js";

class PhysicsObject extends SolidObject {
    constructor(screen, x, y, width=32, height=32, speed=0, direction=0) {
        super(screen, x, y, width, height, speed, direction)

        this.weight = 1;
        this.drag = 1;

        this.acceleration = 1/30;
        this.turnSpeed = 5;

        this.hspeed = 0;
        this.vspeed = 0;
        this.maxSpeed = 40;

        this.friction = .01;
        this.elasticicity = .1;

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


        if (this.speed) {
            this.hspeed += this.speed*this.acceleration * Math.cos(this.direction);
            this.vspeed += this.speed*this.acceleration * Math.sin(this.direction);
        }
        else {
            this.hspeed /= 1 + this.friction * (this.weight/20);
            this.vspeed /= 1 + this.friction * (this.weight/20);
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
        
        this.checkCollsionAhead();

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

        const dir = Calc.getDir(other.x, other.y, this.x, this.y);

        this.hspeed = hm / totalWeight;
        this.vspeed = vm / totalWeight;

        if (this.elasticicity) {
            this.hspeed += Math.cos(dir)*Math.abs(this.elasticicity*this.hspeed);
            this.vspeed += Math.sin(dir)*Math.abs(this.elasticicity*this.vspeed);
        }
        
        
    }

    
    checkCollsionAhead() {
        if (this.moveable) {

            const buffer = this.collisionMask.cellSize * 2;
            const hmod = this.hspeed/Math.abs(this.hspeed);
            const vmod = this.vspeed/Math.abs(this.vspeed);
            

            if (this.hspeed !== 0) {
                const collisions = this.collisionMask.checkCollisionAt(this.x + buffer*hmod, this.y);
                for (let c of collisions) {
                    if (c.ancestry.includes('SolidObject')) {
                        if (!c.moveable) {
                            this.hspeed *= -this.elasticicity;
                        }
                    }
                }
            }
        

            if (this.vspeed !== 0) {
                const collisions = this.collisionMask.checkCollisionAt(this.x, this.y + buffer*vmod);
                for (let c of collisions) {
                    if (c.ancestry.includes('SolidObject')) {
                        if (!c.moveable) {
                            this.vspeed *= -this.elasticicity;
                        }

                    }
                }
            } 

        }

    }
    

    
}

export {PhysicsObject}