import { AbstractCommand } from "./absCommand";
import { Point } from "../interfaces";
import { CommandEnum } from "./CommandEnum";
import { UndoManager } from "../manager/undoManager";
/**
 *  画笔工具
 * 
 * @export
 * @class PenCommand
 * @extends {AbstractCommand}
 */
export default class PenCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.PEN;
        this.data['type'] = this.type;
        this.path = [];
    }

    path: Array<Point>;
    execute(): void {
        super.execute();
        if (!!!this.opt)
            return;

        this.bindEvents();
    }

    private startPos: Point;
    private endPos: Point;
    protected onMouseDownHandler(e: MouseEvent): void {
        super.onMouseDownHandler(e);
        this.path = [];
        this.startPos = new Point(e.layerX, e.layerY);
        // 设置线条宽度
        this.ctx.lineWidth = this.opt.size;
        // 设置颜色
        this.ctx.strokeStyle = this.opt.color;
        // 设置定点的样式
        this.ctx.lineCap = "round";
        // 设置拐点样式
        this.ctx.lineJoin = "round";
        // 像素叠加属性 from:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startPos.x, this.startPos.y);
        this.path.push(new Point(this.startPos.x, this.startPos.y));
    }

    protected onMouseMovehandler(e: MouseEvent): void {
        super.onMouseMovehandler(e);
        this.ctx.lineTo(e.layerX, e.layerY);
        this.ctx.stroke();
        this.path.push(new Point(e.layerX, e.layerY));
    }

    protected onMouseUpHandler(e: MouseEvent): void {
        super.onMouseUpHandler(e);
        this.endPos = new Point(e.layerX, e.layerY);
        this.path.push(this.endPos);
        UndoManager.getInstance().push(this.getImageData());
    }

    complete() {
        super.complete();
        this.path = [];
    }

    toJSON(): string {
        this.data["path"] = this.path;
        this.data["opt"] = this.opt;
        var s: string = JSON.stringify(this.data);
        return JSON.stringify(this.data);
    }

    fromJSON(data: string) {
        //{"type":"pen_command","path":[{"x":247,"y":165},{"x":248,"y":165},{"x":250,"y":165},{"x":251,"y":165},{"x":252,"y":165},{"x":253,"y":165},{"x":254,"y":165},{"x":255,"y":165},{"x":255,"y":165}],"opt":{"color":"#000000","size":"4","content":""}}
        var o: any = JSON.parse(data);
        var type: string = o['type'];
        var arr: Array<any> = o['path'];
        var p: Array<Point> = [];
        arr.forEach((val, idx, arr) => {
            p.push(Point.from(val));
        });
    }
}
