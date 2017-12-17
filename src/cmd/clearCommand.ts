import AbstractCommand from "./absCommand";
import { CommandEnum } from "./CommandEnum";
import { UndoManager } from "../manager/undoManager";
import { VEvent, VEventEnum } from "../events/events";
import BoardOption from "../cmd/option";

/**
 * 清空面板操作
 * 
 * @export
 * @class ClearCommand
 * @extends {AbstractCommand}
 */
export default class ClearCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.CLEAR;
        this.data['type'] = this.type;
        this.data['path'] = [];
    }

    execute() {
        super.execute();
        this.opt = new BoardOption();
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);
        UndoManager.getInstance().push(this.getImageData());
        VEvent.trigger(VEventEnum.Add, this.toJSON());
    }

    complete() {
        super.complete();
        this.path = [];
    }

    drawByJSON() {
        super.drawByJSON();
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);
        UndoManager.getInstance().push(this.getImageData());
    }
}