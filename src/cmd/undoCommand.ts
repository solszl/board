import AbstractCommand from "./absCommand";
import { CommandEnum } from "./CommandEnum";
import BoardOption from "../cmd/option";
import { UndoManager } from "../manager/undoManager";
import { VEvent, VEventEnum } from "../events/events";

export default class UndoCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.UNDO;
        this.data['path'] = [];
        this.data['type'] = this.type;
    }

    execute() {
        super.execute();
        if (UndoManager.getInstance().canUndo()) {
            this.opt = new BoardOption();
            var bmd: ImageData | undefined = UndoManager.getInstance().undo();
            if (bmd) {
                this.ctx.putImageData(bmd as ImageData, 0, 0);
                VEvent.trigger(VEventEnum.Add, this.toJSON());
            }
        }
    }

    drawByJSON() {
        super.drawByJSON();
        if (UndoManager.getInstance().canUndo()) {
            var bmd: ImageData | undefined = UndoManager.getInstance().undo();
            if (bmd) {
                this.ctx.putImageData(bmd as ImageData, 0, 0);
            }
        }
    }
}