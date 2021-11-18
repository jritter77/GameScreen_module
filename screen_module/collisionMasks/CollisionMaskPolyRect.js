
import { CollisionMask } from "./CollisionMask.js";



class CollisionMaskPolyRect extends CollisionMask {
    
    constructor(host, x=host.x, y=host.y, width=host.width, height=host.height, cellSize=4) {
        const c = Math.ceil(width*1.5 / cellSize);
        const r = Math.ceil(height*1.5 / cellSize);

        const s = Math.max(r, c);

        super(host, x, y, s, s, cellSize);

        this.maskWidth = Math.floor(width / cellSize);
        this.maskHeight = Math.floor(height / cellSize);

    }

    update() {
        super.update();
        this.grid.setAll(0);
        this.grid.setPolyRect(this.grid.rows/2, this.grid.cols/2, this.maskWidth, this.maskHeight, 1, this.host.direction, true);
    }


}



export {CollisionMaskPolyRect}