import Constants from "./constants";

export class Point {
    private x: number;
    private y: number;
    constructor(x: number, y: number) {
        this.$x = x;
        this.$y = y;
    }

    static from(val: any): Point {
        return new Point(val.x, val.y);
    }

    normalized(): Point {
        return new Point(this.$x / Constants.Ratio, this.$y / Constants.Ratio);
    }

    toString(): string {
        return `{x: ${this.x}, y: ${this.y}}`;
    }

    distance(target: Point): Point {
        return new Point(this.$x - target.$x, this.$y - target.$y);
    }
    public set $x(val: number) {
        this.x = this.fomatFloat(val);
    }

    public get $x(): number {
        return this.fomatFloat(this.x);
    }
    public set $y(val: number) {
        this.y = this.fomatFloat(val);
    }

    public get $y(): number {
        return this.fomatFloat(this.y);
    }

    private fomatFloat(src: number, pos: number = 1): number {
        return parseFloat(src.toFixed(pos));
        // return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
}