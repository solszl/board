export class Point {
    public _x: number;
    public _y: number;
    static scale: number = 1;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static distance(p1: Point, p2: Point): number {
        var dis = 0;
        dis = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        return dis;
    }

    static from(val: any): Point {
        return new Point(val.x, val.y);
    }

    toString(): string {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    public set x(val: number) {
        this._x = val;
    }

    public get x(): number {
        return this._x / Point.scale;
    }
    public set y(val: number) {
        this._y = val;
    }

    public get y(): number {
        return this._y / Point.scale;
    }
}