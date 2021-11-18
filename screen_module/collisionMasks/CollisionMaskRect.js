
import { CollisionMask } from "./CollisionMask.js";



class CollisionMaskRect extends CollisionMask {
    
    constructor(host, x=host.x, y=host.y, width=host.width, height=host.height, cellSize=4) {
        const c = Math.ceil(width / cellSize);
        const r = Math.ceil(height / cellSize);

        super(host, x, y, r, c, cellSize);

        this.maskWidth = Math.floor(width / cellSize);
        this.maskHeight = Math.floor(height / cellSize);


        this.grid.setAll(1);
    }


}



export {CollisionMaskRect}