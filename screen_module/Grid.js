import { Calc } from "./Calc";

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

        const slope = Calc.getSlope(p1.col, p1.row, p2.col, p2.row);
        
        // If Slope is approaching vertical, find cols as a function of rows
        if (slope < -1 || slope > 1) {

            const start = Math.min(p1.row, p2.row);
            const end = Math.max(p1.row, p2.row);
            const f = Calc.getLineX;

            for (let row=start; row<end; row++) {
                const col = Math.floor( f(row, slope, p1.col, p1.row) );
                this[row][col] = val;
                cells.push({row: row, col: col});
            }

        }

        // Else find rows as a function of cols
        else {

            const start = Math.min(p1.col, p2.col);
            const end = Math.max(p1.col, p2.col);
            const f = Calc.getLineY;

            for (let col=start; col<end; col++) {
                const row = Math.floor( f(col, slope, p1.col, p1.row) );
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


    setDisc(row, col, radius, val) {
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

    
    

    setPoly(row, col, size, sides, val, angle=0, fill=false){

        const spread = (Math.PI*2)/sides;

        let colVals = [];
        let rowVals = [];

        let curCol = Math.round(col + size*Math.cos(angle));
        let curRow = Math.round(row + size*Math.sin(angle));

        // set lines of polygon
        for (let i=1; i<sides+1; i++) {

            const nextCol = Math.floor(col + size*Math.cos(angle + spread*i));
            const nextRow = Math.floor(row + size*Math.sin(angle + spread*i));

            this.setLine({col: curCol, row: curRow}, {col: nextCol, row: nextRow}, val);

            colVals.push(curCol, nextCol);
            rowVals.push(curRow, nextRow);


            curCol = nextCol;
            curRow = nextRow;

        }


        // fill in area within lines
        if (fill) {
            for (let r=Math.min(...rowVals)+1; r<Math.max(...rowVals); r++) {

                let start = this[r].indexOf(val);
                let end = this[r].lastIndexOf(val);
    
    
                if (end <= start) {
                    end = this[r-1].lastIndexOf(val)+1;
                } 
    
                for (let c=start; c<end; c++) {
                        this[r][c] = val;
                }
    
            }
        }

        
    }


    setPolyRect(row, col, width, height, val, angle=0, fill=false) {
        const dist = Math.floor(Calc.getDist(col, row, col+width/2, row+height/2));
        const dir = Calc.getDir(col, row, col+width/2, row+height/2);

        const p1 = {row: row + Math.floor(dist*Math.sin(dir+angle)), col: col + Math.floor(dist*Math.cos(dir+angle))};
        const p2 = {row: row + Math.floor(dist*Math.sin(Math.PI-dir+angle)), col: col + Math.floor(dist*Math.cos(Math.PI-dir+angle))};
        const p3 = {row: row + Math.floor(dist*Math.sin(Math.PI+dir+angle)), col: col + Math.floor(dist*Math.cos(Math.PI+dir+angle))};
        const p4 = {row: row + Math.floor(dist*Math.sin(-dir+angle)), col: col + Math.floor(dist*Math.cos(-dir+angle))};


        this.setLine(p1, p2, val);
        this.setLine(p2, p3, val);
        this.setLine(p3, p4, val);
        this.setLine(p4, p1, val);

        if (fill) {

            const rowStart = Math.min(p1.row, p2.row, p3.row, p4.row);
            const rowEnd = Math.max(p1.row, p2.row, p3.row, p4.row);
            

            for (let r=rowStart+1; r<rowEnd; r++) {

                const colStart = this[r].indexOf(val);
                const colEnd = this[r].lastIndexOf(val);

                for (let c=colStart+1; c<colEnd; c++) {
                    this[r][c] = val;
                }
            }

        }
    }
}

export {Grid}