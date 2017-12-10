import { AbstractCommand } from "./absCommand";
import { CommandEnum } from "./CommandEnum";
import { UndoManager } from "../manager/undoManager";

export default class EraserCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.EARSER;
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
    }

    protected onMouseMovehandler(e: MouseEvent): void {
        super.onMouseMovehandler(e);
        this.ctx.lineTo(e.layerX, e.layerY);
        this.ctx.stroke();
    }

    protected onMouseUpHandler(e: MouseEvent): void {
        super.onMouseUpHandler(e);
        UndoManager.getInstance().push(this.getImageData());
    }
}