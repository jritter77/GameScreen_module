import { Calc } from "./Calc";
import { CollisionMask } from "./CollisionMask";
import { MotionObject } from "./MotionObject.js";

class CollisionObject extends MotionObject {

    constructor(screen, x, y, width=32, height=32, speed=0, direction=0) {
        super(screen, x, y, speed, direction);

        this.width = width;
        this.height = height;
        this.size = Math.round(Calc.getDist(x, y, x+width, y+height) / 2);
        this.sides = 4;

        this.collisionMask = new CollisionMask(this, this.x, this.y, this.size);
        this.collisionMask.showMask = true;

    }

    update() {
        super.update();
        if (this.collisionMask.collisions.length) console.log(this.collisionMask.collisions[0].getAncestry());
    }

    drawMiddleground() {
        this.screen.draw.poly(this.scaledX, this.scaledY, this.size*this.screen.scale, this.sides, this.direction);
    }
}


export {CollisionObject}