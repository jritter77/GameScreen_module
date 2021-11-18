import { Calc } from "../Calc.js";
import { ScreenGrid } from "../objects/ScreenGrid.js";



class CollisionMask extends ScreenGrid {
    
    constructor(host, x=host.x, y=host.y, rows, cols, cellSize=4) {
        super(host.screen, x, y, rows, cols, cellSize);

        this.host = host;
        this.collisions = [];

        this.width = this.cellSize * this.grid.cols;
        this.height = this.cellSize * this.grid.rows;

        this.showMask = false;

        this.screen.masks.push(this);
        
        this.stats = "";


    }

    update() {
        super.update();

        this.x = Math.floor(this.host.x - this.cellSize * (this.grid.cols/2)) ;
        this.y = Math.floor(this.host.y - this.cellSize * (this.grid.rows/2)) ;
        
    }



    drawForeground() {
        if (this.showMask) {
            this.draw();
            this.drawMask();
        }
    }


    drawMask() {
        for (let r=0; r<this.grid.rows; r++) {
            for (let c=0; c<this.grid.cols; c++) {
                if (this.grid[r][c]) {
                    this.highlightCell(r, c);
                }
            }
        }
    }


    checkCollisionAt(x, y) {
        this.x = Math.floor(x - this.cellSize * (this.grid.cols/2)) ;
        this.y = Math.floor(y - this.cellSize * (this.grid.rows/2)) ;

        this.checkCollision();

        this.x = Math.floor(this.host.x - this.cellSize * (this.grid.cols/2)) ;
        this.y = Math.floor(this.host.y - this.cellSize * (this.grid.rows/2)) ;
        
        return this.collisions;
    }


    checkCollision() {
        this.collisions = [];
        this.highlightColor = 'rgba(0, 200, 0, 0.5)';
        this.gridColor = 'grey';

        for (let mask of this.screen.masks) {
            if (mask !== this) {
                if (Calc.collisionRect(this.x, this.y, this.width, this.height, mask.x, mask.y, mask.width, mask.height)) {

                    if (this.host.master) {
                        if (mask.host.master) {
                            if (this.host.master === mask.host.master) {
                                continue;
                            }
                        }
                    }
                    
                    this.gridColor = 'orange';

                    if (this.checkPrecCollision(mask)) {
                        this.highlightColor = 'rgba(0, 0, 200, 0.5)';
                        this.collisions.push(mask.host);
                        continue;
                    }

                    
                }   
                
            }
        }
    }


    checkPrecCollision(mask) {
        

        const dist = Math.round(Calc.getDist(this.x, this.y, mask.x, mask.y) / this.cellSize);
        const dir = Calc.getDir(this.x, this.y, mask.x, mask.y);

        let sectARow = Math.round(dist * Math.sin(dir));
        let sectACol = Math.round(dist * Math.cos(dir));

        let sectBRow = 0;
        let sectBCol = 0;

        if (sectARow < 0) {
            sectARow = 0;
            sectBRow = Math.round(dist * -Math.sin(dir));
        }

        if (sectACol < 0) {
            sectACol = 0;
            sectBCol = Math.round(dist * -Math.cos(dir));
        }

        const rows = Math.min(this.grid.rows-sectARow, mask.grid.rows-sectBRow);
        const cols = Math.min(this.grid.cols-sectACol, mask.grid.cols-sectBCol);

        const sect1 = this.grid.getRect(sectARow, sectACol, cols, rows);
        const sect2 = mask.grid.getRect(sectBRow, sectBCol, cols, rows);

        

        for (let r=0; r<rows; r++) {
            for (let c=0; c<cols; c++) {
                
                if ( (sect1[r][c] === 1) && (sect1[r][c] === sect2[r][c])) {
                    return true;
                }

            }
        }
        
    
        

        return false;

    }
    

    
}



export {CollisionMask}