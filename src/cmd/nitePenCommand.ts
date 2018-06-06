import AbstractCommand from "./absCommand";
import { CommandEnum } from "./commandEnum";
import Constants from "../constants";
import { Point } from "../interfaces";
import PenCommand from "./penCommand";
import { UndoManager } from "../manager/undoManager";
import { VEvent, VEventEnum } from "../events/events";

export default class NightPenCommand extends PenCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.NITE_PEN;
        this.data['type'] = this.type;
    }

    execute(): void {
        super.execute();
    }

    complete() {
        super.complete();
    }

    protected onMouseDownHandler(e: MouseEvent): void {
        super.onMouseDownHandler(e);
        UndoManager.getInstance().push(this.getImageData());
        this.path = [];
        // 设置线条宽度
        this.ctx.lineWidth = this.opt.size * Constants.Ratio;
        // 设置颜色
        this.ctx.strokeStyle = "#80FF80";
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = "#80FF00"
        // 设置定点的样式
        this.ctx.lineCap = "round";
        // 设置拐点样式
        this.ctx.lineJoin = "round";
        // 像素叠加属性 from:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
        this.ctx.globalCompositeOperation = "source-over";
        var startPos: Point = new Point(e.offsetX, e.offsetY);
        this.ctx.beginPath();
        this.ctx.moveTo(e.offsetX, e.offsetY);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.path.push(startPos);
    }

    // protected onMouseMovehandler(e: MouseEvent): void {
    //     super.onMouseMovehandler(e);
    // }

    protected onMouseUpHandler(e: MouseEvent): void {
        // super.onMouseUpHandler(e);
        var p: Point = new Point(e.offsetX, e.offsetY);
        this.path.push(p);
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
        this.root.addEventListener("mousedown", this.md);
        VEvent.trigger(VEventEnum.Add, this.toJSON());

        setTimeout(() => {
            let bmd: ImageData | undefined = UndoManager.getInstance().undo();
            if (bmd) {
                this.ctx.putImageData(bmd as ImageData, 0, 0);
            }
        }, 1000);
    }

    drawByJSON() {
        UndoManager.getInstance().push(this.getImageData());
        this.ctx.lineWidth = this.opt.size * Constants.Ratio;
        this.ctx.strokeStyle = "#80FF80";
        this.ctx.shadowBlur = 4;
        this.ctx.shadowColor = "#80FF00"
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.beginPath();

        if (this.path.length > 1) {
            this.ctx.moveTo(this.path[0].$x * Constants.Ratio, this.path[0].$y * Constants.Ratio);

            this.path.forEach((val, idx, arr) => {
                this.ctx.lineTo(val.$x * Constants.Ratio, val.$y * Constants.Ratio);
            });

            this.ctx.stroke();
        }

        setTimeout(() => {
            let bmd: ImageData | undefined = UndoManager.getInstance().undo();
            if (bmd) {
                this.ctx.putImageData(bmd as ImageData, 0, 0);
            }
        }, 1000);

    }
}