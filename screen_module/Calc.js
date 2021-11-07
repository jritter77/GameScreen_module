class Calc {


    //SLOPE FUNCTION
    static getSlope(x1, y1, x2, y2) {
        const dx = (x1 - x2);
        const dy = (y1 - y2);
        return (dy / dx);
    }

    // Returns y coordinate from given x coordinate of a line
    static getLineY(x, m, px, py) {
        return m * (x - px) + py;
    }


    // Return x coordinate from given y coordinate of a line
    static getLineX(y, m, px, py) {
        return (y - py) / m + px;
    }

    
    //DISTANCE FUNCTION
    static getDist(ax, ay, bx, by) {
        let dx = ax - bx;
        let dy = ay - by;
        let d = Math.sqrt(dx*dx + dy*dy);
        return d;
    }

    //DIRECTION FUNCTION
    static getDir(ax, ay, bx, by) {
        let dx = bx - ax;
        let dy = (by - ay);
        let dir = Math.atan(dy/dx);

        if (dx<0){
            dir+= Math.PI;
        }
        else if (dy<0){
            dir += Math.PI*2;
        }
        
        
        return (dir);
    }



    static collisionCircleObj(a, b){
        let dx = (a.x) - (b.x);
        let dy = (a.y) - (b.y);
        let dist = Math.sqrt(dx*dx + dy*dy)

        if (a.size + b.size > dist){
            return true;
        }
    }

    static collisionCircle(x1, y1, r1, x2, y2, r2){
        let dx = (x1) - (x2);
        let dy = (y1) - (y2);
        let dist = Math.sqrt(dx*dx + dy*dy)

        if (r1 + r2 > dist){
            return true;
        }
        return false;
    }

    static collisionRectObj(a, b){
        if (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y)return true;
        return false;
    }

    static collisionRect(x1, y1, w1, h1, x2, y2, w2, h2){
        if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2)return true;
        return false;
    }


    static collisionLine(x1, y1, x2, y2, objArr){
        let dir = getDir(x1, y1, x2, y2);
        let dist = getDist(x1, y1, x2, y2);

        for (let i=0; i<=dist; i++){
            let x = x1 + Math.cos(dir)*i;
            let y = y1 + Math.sin(dir)*i;
            for (let k in objArr){
                let obj = objArr[k];
                if (collisionRect(x, y, 1, 1, obj.x, obj.y, obj.width, obj.height))return true;
            }
        }
        
        return false;
    }
        

    static pointInCircle(px, py, cx, cy, cr){
        let d = getDist(px, py, cx, cy);
        return (d < cr);
    }

    static pointInRect(px, py, rx, ry, rw, rh){
        return (px>=rx && px<rx+rw && py>=ry && py<ry+rh);   
    }

    static placeEmpty(x, y){
        for (let k in instances){
            if (instances[k].x == x && instances[k].y == y)return false;
        }
        return true;
    }

    static placeMeeting(x, y, objArr){
        for (let inst of objArr){
            if (inst.x == x && inst.y == y){
                return inst;
            }
        }
        return false;
    }

}

export {Calc}
    