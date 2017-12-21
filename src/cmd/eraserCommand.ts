import AbstractCommand from "./absCommand";
import { CommandEnum } from "./commandEnum";
import { UndoManager } from "../manager/undoManager";
import { Point } from "../interfaces";
import { DataManager } from "../manager/dataManager";
import { VEvent, VEventEnum } from "../events/events";

export default class EraserCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.EARSER;
        this.data['type'] = this.type;
    }

    execute() {
        if (!!!this.opt)
            return;
        this.bindEvents();
    }

    complete() {
        super.complete();
        this.ctx.globalCompositeOperation = "source-over";
    }

    protected onMouseDownHandler(e: MouseEvent): void {
        super.onMouseDownHandler(e);
        // 设置线条宽度
        this.ctx.lineWidth = this.opt.size;
        // 设置颜色
        this.ctx.strokeStyle = this.opt.color;
        // 设置定点的样式
        this.ctx.lineCap = "round";
        // 设置拐点样式
        this.ctx.lineJoin = "round";
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.beginPath();
        this.path.push(new Point(e.layerX, e.layerY).normalized());
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
        this.path.push(new Point(e.layerX, e.layerY).normalized());
        UndoManager.getInstance().push(this.getImageData());
        VEvent.trigger(VEventEnum.Add, this.toJSON());
    }

    drawByJSON() {
        this.ctx.lineWidth = this.opt.size;
        this.ctx.strokeStyle = this.opt.color;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.beginPath();
        if (this.path.length > 1) {
            this.ctx.moveTo(this.path[0].$x, this.path[0].$y);

            this.path.forEach((val, idx, arr) => {
                this.ctx.lineTo(val.$x, val.$y);
                this.ctx.stroke();
            })
        }
        this.ctx.globalCompositeOperation = "source-over";
        UndoManager.getInstance().push(this.getImageData());
    }
}