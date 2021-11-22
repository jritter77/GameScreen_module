
import { CollisionMask } from "./CollisionMask.js";



class CollisionMaskPoly extends CollisionMask {
    
    constructor(host, x=host.x, y=host.y, size=host.width/2, sides=4, cellSize=4) {
        const s = Math.ceil(size*2.2 / cellSize);

        super(host, x, y, s, s, cellSize);


        this.maskSize = Math.floor(size / cellSize);
        this.maskSides = sides;

    }

    update() {
        super.update();
        this.grid.setAll(0);
        this.grid.setPoly(this.grid.rows/2, this.grid.cols/2, this.maskSize, this.maskSides, 1, this.host.direction, true);
    }


}



export {CollisionMaskPoly}