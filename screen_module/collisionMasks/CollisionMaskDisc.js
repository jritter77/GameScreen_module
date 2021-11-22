
import { CollisionMask } from "./CollisionMask.js";



class CollisionMaskDisc extends CollisionMask {
    
    constructor(host, x=host.x, y=host.y, r=32, cellSize=4) {
        const s = Math.ceil(r*2 / cellSize) + 2;

        super(host, x, y, s, s, cellSize);

        this.maskSize = Math.floor(r / cellSize);


        
        this.grid.setDisc(this.grid.rows/2, this.grid.cols/2, this.maskSize, 1);
    }


}



export {CollisionMaskDisc}