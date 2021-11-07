import { Grid } from "./Grid.js";
import { ScreenObject } from "./ScreenObject.js";

class ScreenGrid extends ScreenObject {

    constructor(screen, x, y, rows, cols, cellSize) {
        super(screen, x, y);
        this.grid = new Grid(rows, cols, 0);
        this.cellSize = cellSize;
        this.visible = true;
        this.showMouse = false;
        this.gridColor = 'grey';
        this.highlightColor = 'rgba(0, 200, 0, 0.5)';
    }

    draw() {

        if (this.visible) {

            for (let r=0; r<=this.grid.rows; r++) {
                this.screen.draw.line(
                    this.scaledX, 
                    this.scaledY + this.cellSize*r*this.screen.scale, 
                    this.scaledX + this.cellSize*this.grid.cols*this.screen.scale, 
                    this.scaledY + this.cellSize*r*this.screen.scale, 
                    this.gridColor
                );
            }
    
            for (let c=0; c<=this.grid.cols; c++) {
                this.screen.draw.line(
                    this.scaledX + this.cellSize*c*this.screen.scale, 
                    this.scaledY, 
                    this.scaledX + this.cellSize*c*this.screen.scale, 
                    this.scaledY + this.cellSize*this.grid.rows*this.screen.scale, 
                    this.gridColor
                );
            }


            if (this.showMouse) {
                this.highlightMouse();
            }


        }
        
    }

    highlightCell(row, col) {
        this.screen.draw.rect(
            this.scaledX + col * this.cellSize * this.screen.scale, 
            this.scaledY + row * this.cellSize * this.screen.scale, 
            this.cellSize * this.screen.scale, 
            this.cellSize * this.screen.scale, 
            this.highlightColor);
    }

    
    getCellNearest(x, y) {
        const col = Math.floor( (x - this.x) / this.cellSize );
        const row = Math.floor( (y - this.y) / this.cellSize );
        return {row: row, col: col}
    }


    highlightMouse() {
        const n = this.getCellNearest(this.screen.mouse.x, this.screen.mouse.y);

        if (n.row >= 0 && n.row < this.grid.rows && n.col >= 0 && n.col < this.grid.cols) {
            this.highlightCell(n.row, n.col);
        }
    }



}

export {ScreenGrid}