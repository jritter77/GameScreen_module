import { Calc } from "./Calc";
import { ScreenObject } from "./ScreenObject";

class Grid extends Array {

    constructor(rows, cols, init=0) {
        super();

        this.rows = rows;
        this.cols = cols;

        for (let r=0; r<this.rows; r++) {
            this.push([]);

            for (let c=0; c<this.cols; c++) {
                this[r].push(init);
            }
        }
    }

    toString() {
        return this.map(r => r.join(' ')).join('\n');
    }




    getRect(row, col, width, height) {
        const section = new Grid(height, width);
        for (let r=row; r<row+height; r++) {
            for (let c=col; c<col+width; c++) {
                section[r-row][c-col] = this[r][c];
            }
        }
        return section;
    }




    setAll(val) {
        for (let r=0; r<this.rows; r++) {
            for (let c=0; c<this.cols; c++) {
                this[r][c] = val;
            }
        }
    }

    setRow(row, val) {
        this[row] = this[row].map(() => val);
    }

    setCol(col, val) {
        for (let row of this) {
            row[col] = val;
        }
    }

    setLine(p1, p2, val) {
        const cells = [];

        const slope = Calc.getSlope(p1.x, p1.y, p2.x, p2.y);
        
        // If Slope is approaching vertical, find cols as a function of rows
        if (slope < -1 || slope > 1) {

            const start = Math.min(p1.y, p2.y);
            const end = Math.max(p1.y, p2.y);
            const f = Calc.getLineX;

            for (let row=start; row<end+1; row++) {
                const col = Math.round( f(row, slope, p1.x, p1.y) );
                this[row][col] = val;
                cells.push({row: row, col: col});
            }

        }

        // Else find rows as a function of cols
        else {

            const start = Math.min(p1.x, p2.x);
            const end = Math.max(p1.x, p2.x);
            const f = Calc.getLineY;

            for (let col=start; col<end+1; col++) {
                const row = Math.round( f(col, slope, p1.x, p1.y) );
                this[row][col] = val;
                cells.push({row: row, col: col});
            }

        }

        return cells;
    }

    setRect(row, col, width, height, val) {
        const cells = [];
        for (let r=row; r<row+height; r++) {
            for (let c=col; c<col+width; c++) {
                this[r][c] = val;
                cells.push({row: r, col: c});
            }
        }
        return cells;
    }


    setDisk(row, col, radius, val) {
        const d= radius * 2;
        const cells = [];

        for (let r=row-d; r<row+d; r++) {

            for (let c=col-d; c<col+d; c++) {

                const dist = Calc.getDist(row, col, r, c);
                
                if (dist <= radius) {
                    this[r][c] = val;
                    cells.push({row: r, col: c});
                }

            }

        }
        return cells;
    }

    
    

    setPoly(x, y, size, sides, val, angle=0){

        const spread = (Math.PI*2)/sides;

        let xVals = [];
        let yVals = [];

        let curX = Math.round(x + size*Math.cos(angle));
        let curY = Math.round(y + size*Math.sin(angle));

        // set lines of polygon
        for (let i=1; i<sides+1; i++) {

            const nextX = Math.round(x + size*Math.cos(angle + spread*i));
            const nextY = Math.round(y + size*Math.sin(angle + spread*i));

            this.setLine({x: curX, y: curY}, {x: nextX, y: nextY}, val);

            xVals.push(curX, nextX);
            yVals.push(curY, nextY);


            curX = nextX;
            curY = nextY;

        }


        // fill in area within lines
        for (let r=Math.min(...yVals)+1; r<Math.max(...yVals); r++) {
            let fill = false;
            let prevFilled = false;

            for (let c=0; c<this.cols; c++) {

                if (c >= Math.max(...xVals)) {
                    break;
                }

                if (fill && !this[r][c]) {
                    this[r][c] = val;
                    prevFilled = true;
                }
                


                if (!fill && !prevFilled && this[r][c]) {
                    fill = true;
                }
                else if (fill && prevFilled && this[r][c+1]) {
                   break;
                }
                
            }

        }

        
    }
}

export {Grid}