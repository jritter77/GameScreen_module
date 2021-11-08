import { Calc } from "./Calc.js";
import { ScreenGrid } from "./ScreenGrid.js";


// *** NOT SUITABLE FOR SMALL OBJECTS!!! USE COLLISION_RECT FOR SMALL OBJECTS!!! *** 

class CollisionMask extends ScreenGrid {
    
    constructor(host, x=host.x, y=host.y, width=15, height=15, cellSize=4) {
        super(host.screen, host.x, host.y, width, height, cellSize);
        this.host = host;

        this.size = Math.floor(width/2 - 1) ;
        this.sides = 4;

        this.width = this.cellSize * this.grid.cols;
        this.height = this.cellSize * this.grid.rows;

        this.showMask = false;

        this.screen.masks.push(this);

    }

    update() {
        super.update();

        this.grid.setAll(0);
        
        this.grid.setPoly(this.grid.cols/2-1, this.grid.rows/2-1, this.size, this.sides, 1, this.host.direction+Math.PI/4);

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
        for (let mask of this.screen.masks) {
            if (mask !== this) {
                if (Calc.collisionRect(this.x, this.y, this.width, this.height, mask.x, mask.y, mask.width, mask.height)) {
                    this.gridColor = 'orange';
                    this.checkPrecCollision(mask);
                }   
                else {
                    this.gridColor = 'grey';
                }
            }
        }
    }


    checkPrecCollision(mask) {
        const xOffset = (this.x - mask.x) / this.cellSize;
        const yOffset = (this.y - mask.y) / this.cellSize;

        let sect1;
        let sect2;

        if (xOffset > 0) {
            if (yOffset > 0) {
                sect1 = this.grid.getRect(0, 0, this.grid.cols-xOffset, this.grid.rows-yOffset);
                sect2 = mask.grid.getRect(yOffset, xOffset, mask.grid.cols-xOffset, mask.grid.rows-yOffset);
            }
            else {
                sect1 = this.grid.getRect(-yOffset, 0, this.grid.cols-xOffset, this.grid.rows+yOffset);
                sect2 = mask.grid.getRect(0, xOffset, mask.grid.cols-xOffset, mask.grid.rows+yOffset);
            }
        }
        else {
            if (yOffset > 0) {
                sect1 = this.grid.getRect(0, -xOffset, this.grid.cols+xOffset, this.grid.rows-yOffset);
                sect2 = mask.grid.getRect(yOffset, 0, mask.grid.cols+xOffset, mask.grid.cols-yOffset);
            }
            else {
                sect1 = this.grid.getRect(-yOffset, -xOffset, this.grid.cols+xOffset, this.grid.rows+yOffset);
                sect2 = mask.grid.getRect(0, 0, mask.grid.cols+xOffset, mask.grid.rows+yOffset);
            }
        }


        for (let r=0; r<sect1.rows; r++) {
            for (let c=0; c<sect1.cols; c++) {
                if (sect1[r][c] && sect1[r][c] === sect2[r][c]) {
                    this.highlightColor = 'rgba(0, 0, 200, 0.5)'
                    return;
                }
            }
        }

        this.highlightColor = 'rgba(0, 200, 0, 0.5)';

    }

    
}



export {CollisionMask}