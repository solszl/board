import AbstractCommand from "./absCommand";
import { Point } from "../interfaces";
import { CommandEnum } from "./commandEnum";
import { UndoManager } from "../manager/undoManager";
import { DataManager } from "../manager/dataManager";
import Constants from "../constants";

export default class RectCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.RECT;
        this.data['type'] = this.type;
        this.path = [];
    }

    drawByJSON() {
        this.ctx.lineWidth = this.opt.size * Constants.Ratio;
        this.ctx.strokeStyle = this.opt.color;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.beginPath();

        if (this.path.length > 1) {
            let xpos = this.path[0].$x * Constants.Ratio;
            let ypos = this.path[0].$y * Constants.Ratio;
            let w = (this.path[1].$x - this.path[0].$x) * Constants.Ratio;
            let h = (this.path[1].$y - this.path[0].$y) * Constants.Ratio;
            this.ctx.rect(xpos, ypos, w, h);
        }

        this.ctx.stroke();

        UndoManager.getInstance().push(this.getImageData());
    }
}