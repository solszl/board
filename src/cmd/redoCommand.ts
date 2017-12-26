import AbstractCommand from "./absCommand";
import { CommandEnum } from "./commandEnum";
import BoardOption from "../cmd/option";
import { UndoManager } from "../manager/undoManager";
import { VEvent, VEventEnum } from "../events/events";
import UndoCommand from "./undoCommand";

export default class RedoCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.REDO;
        this.data['path'] = [];
        this.data['type'] = this.type;
    }

    execute() {
        super.execute();
        if (UndoManager.getInstance().canRedo()) {
            this.opt = new BoardOption();
            var bmd: ImageData | undefined = UndoManager.getInstance().redo();
            if (bmd) {
                this.ctx.putImageData(bmd as ImageData, 0, 0);
                VEvent.trigger(VEventEnum.Add, this.toJSON());
            }
        }
    }

    drawByJSON() {
        super.drawByJSON();
        if (UndoManager.getInstance().canRedo()) {
            var bmd: ImageData | undefined = UndoManager.getInstance().redo();
            if (bmd) {
                this.ctx.putImageData(bmd as ImageData, 0, 0);
            }
        }
    }
}