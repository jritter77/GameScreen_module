import { Calc } from "./Calc";
import { CollisionObject } from "./CollisionObject";
import { PhysicsObject } from "./PhysicsObject.js";
import { SolidObject } from "./SolidObject";

class CompositeObject extends PhysicsObject {

    constructor(screen, x, y, width=32, height=32, direction=0) {
        super(screen, x, y, width, height, direction);

        this.master = this;

        this.parts = [];

        this.addPart(this.size+64, 0, 64, 64);
        this.addPart(-64, -64, 64, 64);
        this.addPart(-64, 64, 64, 64);

    }

    

    addPart(x, y, width, height) {
        this.parts.push(new Part(this, x, y, width, height));
    }

}

class Part extends PhysicsObject {
    constructor(master, x, y, width, height) {
        super(master.screen, master.x + x, master.y + y, width, height);
        this.master = master;
        this.dist = Calc.getDist(this.x, this.y, master.x, master.y);
        this.dir = Calc.getDir(master.x, master.y, this.x, this.y);
    }



    move() {
        this.direction = this.master.direction+(Math.PI/4);
        this.x = this.master.x + this.dist * Math.cos(this.dir + this.master.direction);
        this.y = this.master.y + this.dist * Math.sin(this.dir + this.master.direction);
    }



    collision() {
        const collisions = this.collisionMask.collisions;

        // Check if any collisions are present
        if (this.collisionMask.collisions.length) {

            // loop through collisions
            for (let other of collisions) {

                if (this.master) {
                    if (other === this.master) {
                        continue;
                    }

                    if (other.master) {
                        if (this.master === other.master) {
                            continue;
                        }
                    }
                }

                

                if (other.master) {
                    other = other.master;
                }


                // loop through all types of other object
                for (let type of other.ancestry) {

                    // if a collision event exists for object type, execute event
                    if (this.master.collisionEvents[type]) {
                        
                        this.master.collisionEvents[type](other);

                    }
                }
            }
        }
    }
}


export {CompositeObject}