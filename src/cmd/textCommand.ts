import AbstractCommand from "./absCommand";
import { UndoManager } from "../manager/undoManager";
import { Point } from "../interfaces";
import { DataManager } from "../manager/dataManager";
import { VEvent, VEventEnum } from "../events/events";
import Constants from "../constants";

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
        if (!!!this.opt)
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
        var p: Point = new Point(e.pageX, e.pageY).distance(Constants.OriginPoint);
        this.ctx.fillText(str, p.$x, p.$y);
    }

    protected onMouseMovehandler(e: MouseEvent): void {
        super.onMouseMovehandler(e);
        this.ctx.putImageData(this.bmd, 0, 0);
        var str: string = this.opt.content;
        var p: Point = new Point(e.pageX, e.pageY).distance(Constants.OriginPoint);
        this.ctx.fillText(str, p.$x, p.$y);
    }

    private endPoint: Point;
    protected onMouseUpHandler(e: MouseEvent): void {
        super.onMouseUpHandler(e);
        this.endPoint = new Point(e.pageX, e.pageY).distance(Constants.OriginPoint);
        this.path.push(this.endPoint.normalized());
        this.complete();
        UndoManager.getInstance().push(this.getImageData());
        VEvent.trigger(VEventEnum.Add, this.toJSON());
    }

    drawByJSON() {
        this.ctx.font = Math.floor(this.opt.size * Constants.Ratio) + "px Arial";
        this.ctx.fillStyle = this.opt.color;
        var p: Point = this.path[0];
        this.ctx.fillText(this.opt.content, p.$x * Constants.Ratio, p.$y * Constants.Ratio);
        UndoManager.getInstance().push(this.getImageData());
    }
}