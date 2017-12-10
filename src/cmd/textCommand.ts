import { AbstractCommand } from "./absCommand";
import { UndoManager } from "../manager/undoManager";
import { Point } from "../interfaces";
import { DataManager } from "../manager/dataManager";

/**
 *  文本命令
 * 
 * @export
 * @class TextCommand
 * @extends {AbstractCommand}
 */
export default class TextCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = "text_command";
        this.data['type'] = this.type;
    }

    execute(): void {
        super.execute();
        if (this.opt === null || this.opt === undefined)
            return;

        this.bindEvents();
        this.ctx.font = this.opt.size + "px Arial";
        this.ctx.fillStyle = this.opt.color;
    }

    // 这个bmd是为了 保存一下上下文，当鼠标移动的时候，重绘，添加文本
    bmd: ImageData;
    protected onMouseDownHandler(e: MouseEvent): void {
        super.onMouseDownHandler(e);
        this.bmd = this.ctx.getImageData(0, 0, this.root.width, this.root.height);
        var str: string = this.opt.content;
        this.ctx.fillText(str, e.layerX, e.layerY);
    }

    protected onMouseMovehandler(e: MouseEvent): void {
        super.onMouseMovehandler(e);
        this.ctx.putImageData(this.bmd, 0, 0);
        var str: string = this.opt.content;
        this.ctx.fillText(str, e.layerX, e.layerY);
    }

    private endPoint: Point;
    protected onMouseUpHandler(e: MouseEvent): void {
        super.onMouseUpHandler(e);
        this.endPoint = new Point(e.layerX, e.layerY);
        this.complete();
        UndoManager.getInstance().push(this.getImageData());
        DataManager.getInstance().dispatch(this.toJSON());
    }

    toJSON(): string {
        this.data["opt"] = this.opt;
        this.data["path"] = [this.endPoint];
        return JSON.stringify(this.data);
    }

    drawByJSON() {
        this.ctx.font = this.opt.size + "px Arial";
        this.ctx.fillStyle = this.opt.color;
        var p: Point = this.path[0];
        this.ctx.fillText(this.opt.content, p.x, p.y);
    }
}