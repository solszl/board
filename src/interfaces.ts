export class Point {
    private x: number;
    private y: number;
    static scale: number = 1;
    static scaleX: number = 1;
    static scaleY: number = 1;
    constructor(x: number, y: number) {
        this.$x = x;
        this.$y = y;
    }

    static distance(p1: Point, p2: Point): number {
        var dis = 0;
        dis = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        return dis;
    }

    static from(val: any): Point {
        return new Point(val.x, val.y);
    }

    normalized(): Point {
        return new Point(this.$x, this.$y);
    }

    toString(): string {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    public set $x(val: number) {
        this.x = this.fomatFloat(val * Point.scaleX);
    }

    public get $x(): number {
        return this.fomatFloat(this.x / Point.scaleX);
    }
    public set $y(val: number) {
        this.y = this.fomatFloat(val * Point.scaleY);
    }

    public get $y(): number {
        return this.fomatFloat(this.y / Point.scaleY);
    }

    private fomatFloat(src: number, pos: number = 1): number {
        return parseFloat(src.toFixed(pos));
        // return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
}