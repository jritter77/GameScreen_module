import { Calc } from "../Calc";
import { CollisionMaskPolyRect } from "../collisionMasks/CollisionMaskPolyRect.js";
import { CollisionMaskRect } from "../collisionMasks/CollisionMaskRect";
import { MotionObject } from "./MotionObject.js";

class CollisionObject extends MotionObject {

    constructor(screen, x, y, width=32, height=32, speed=0, direction=0) {
        super(screen, x, y, speed, direction);

        this.width = width;
        this.height = height;
        this.size = Math.round(Calc.getDist(x, y, x+width, y+height) / 2);
        this.sides = 4;

        this.collisionMask = new CollisionMaskRect(this);
        this.collisionMask.showMask = true;

        this.collisionEvents = {};

        this.drawColor = 'red';

    }

    

    setCollisionEvent(targetType, action) {
        this.collisionEvents[targetType] = action;
    }

    removeCollisionEvent(targetType) {
        delete this.collisionEvents[targetType];
    }


    collision() {
        const collisions = this.collisionMask.collisions;

        // Check if any collisions are present
        if (this.collisionMask.collisions.length) {

            // loop through collisions
            for (let other of collisions) {

                if (other.master) {
                    other = other.master;
                }

                // loop through all types of other object
                for (let type of other.ancestry) {

                    // if a collision event exists for object type, execute event
                    if (this.collisionEvents[type]) {
                        
                        this.collisionEvents[type](other);

                    }
                }
            }
        }
    }
 

    drawMiddleground() {
        this.screen.draw.polyRect(this.scaledX, this.scaledY, this.width*this.screen.scale, this.height*this.screen.scale, 0, this.drawColor);
    }
}


export {CollisionObject}