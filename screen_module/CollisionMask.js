import { Calc } from "./Calc.js";
import { ScreenGrid } from "./ScreenGrid.js";
import { TextBox } from "./components/TextBox.js"


// *** NOT SUITABLE FOR SMALL OBJECTS!!! USE COLLISION_RECT FOR SMALL OBJECTS!!! *** 

class CollisionMask extends ScreenGrid {
    
    constructor(host, x=host.x, y=host.y, size, sides=4, cellSize=4) {
        const width = Math.ceil(size*2.1 / cellSize);
        const height = Math.ceil(size*2.1 / cellSize);

        super(host.screen, x, y, width, height, cellSize);

        this.host = host;
        this.collisions = [];

        this.size = Math.floor(size / cellSize);
        this.sides = sides;

        this.width = this.cellSize * this.grid.cols;
        this.height = this.cellSize * this.grid.rows;

        this.showMask = false;

        this.screen.masks.push(this);
        
        this.stats = "";


    }

    update() {
        super.update();

        this.grid.setAll(0);
        
        this.grid.setPoly(this.grid.cols/2-1, this.grid.rows/2-1, this.size, this.sides, 1, this.host.direction);

        this.x = Math.floor( (this.host.x - this.cellSize * (this.grid.cols/2 - 1)) / this.cellSize ) * this.cellSize;
        this.y = Math.floor( (this.host.y - this.cellSize * (this.grid.rows/2 - 1)) / this.cellSize ) * this.cellSize;

        this.checkCollision();

        
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


    checkCollision() {
        this.collisions = [];
        this.highlightColor = 'rgba(0, 200, 0, 0.5)';
        this.gridColor = 'grey';

        for (let mask of this.screen.masks) {
            if (mask !== this) {
                if (Calc.collisionRect(this.x, this.y, this.width, this.height, mask.x, mask.y, mask.width, mask.height)) {
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