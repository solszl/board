import { AbstractCommand } from "./absCommand";
import { UndoManager } from "../manager/undoManager";

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

    protected onMouseUpHandler(e: MouseEvent): void {
        super.onMouseUpHandler(e);
        UndoManager.getInstance().push(this.getImageData());
    }
}