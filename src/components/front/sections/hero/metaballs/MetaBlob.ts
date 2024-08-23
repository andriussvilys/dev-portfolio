type Point = {
    x:number,
    y:number
}
type Color = {
    r:number,
    g:number,
    b:number
}

class MetaBlob {
    radiusBase: number;
    radiusGrowRate: number = 1.001;
    pos: {x:number, y:number};
    radius: number;
    direction: {x:number, y:number};
    speed: number = 1;
    color: Color = {r:0, g:0, b:0}
    constructor(
            pos:{x:number, y:number}, 
            radius:number, 
            direction:{x:number, y:number}, 
            speed:number = 1,
            color:Color = {r:0, g:0, b:0}
        ){
        this.pos = pos;
        this.radius = radius;
        this.direction = direction;
        this.speed = speed;
        this.radiusBase = radius;
        this.color = color;
    }
    move(boundingBox:Point){
        const velocity = {x: this.direction.x * this.speed, y: this.direction.y * this.speed}
        this.pos.x += velocity.x;
        this.pos.y += velocity.y;
        if(this.pos.x > boundingBox.x || this.pos.x < 0){
            this.direction.x *= -1;
        }
        if(this.pos.y > boundingBox.y || this.pos.y < 0){
            this.direction.y *= -1;
        }
    }
}

const dist = (p1:Point, p2:Point) => {
    return Math.sqrt((p2.x - p1.x)**2 + (p2.y-p1.y)**2)
}

export type {Point, Color}
export {MetaBlob, dist}