import { Point } from "./interfaces";

var p1: Point = new Point(100, 200);
var p2: Point = new Point(200, 200);

console.log(Point.distance(p1, p2));