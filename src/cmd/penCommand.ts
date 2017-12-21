import AbstractCommand from "./absCommand";
import { Point } from "../interfaces";
import { CommandEnum } from "./commandEnum";
import { UndoManager } from "../manager/undoManager";
import { DataManager } from "../manager/dataManager";
import { VEvent, VEventEnum } from "../events/events";
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

    execute(): void {
        super.execute();
        if (!!!this.opt)
            return;

        this.bindEvents();
    }

    protected onMouseDownHandler(e: MouseEvent): void {
        super.onMouseDownHandler(e);
        this.path = [];
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
        var startPos: Point = new Point(e.layerX, e.layerY).normalized();
        this.ctx.beginPath();
        this.ctx.moveTo(startPos.$x, startPos.$y);
        this.path.push(startPos);
        // console.log("Point.scale:" + Point.scale);
        // var layerPoint: Point = new Point(e.layerX, e.layerY);
        // console.log("layer: " + layerPoint.toString() + layerPoint.normalized().toString());
        // var offsetPoint: Point = new Point(e.offsetX, e.offsetY);
        // console.log("offset: " + offsetPoint.toString() + offsetPoint.normalized().toString());
        // var clientPoint: Point = new Point(e.clientX, e.clientY);
        // console.log("client: " + clientPoint.toString() + clientPoint.normalized().toString());
    }

    protected onMouseMovehandler(e: MouseEvent): void {
        super.onMouseMovehandler(e);
        var p: Point = new Point(e.layerX, e.layerY).normalized();
        this.ctx.lineTo(p.$x, p.$y);
        this.ctx.stroke();
        this.path.push(p);
    }

    protected onMouseUpHandler(e: MouseEvent): void {
        super.onMouseUpHandler(e);
        var p: Point = new Point(e.layerX, e.layerY).normalized();
        this.path.push(p);
        UndoManager.getInstance().push(this.getImageData());
        VEvent.trigger(VEventEnum.Add, this.toJSON());
    }

    complete() {
        super.complete();
        this.path = [];
    }

    drawByJSON() {
        this.ctx.lineWidth = this.opt.size;
        this.ctx.strokeStyle = this.opt.color;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.beginPath();

        if (this.path.length > 1) {
            this.ctx.moveTo(this.path[0].$x, this.path[0].$y);

            this.path.forEach((val, idx, arr) => {
                this.ctx.lineTo(val.$x, val.$y);
                this.ctx.stroke();
            })
        }
        UndoManager.getInstance().push(this.getImageData());
    }
}
