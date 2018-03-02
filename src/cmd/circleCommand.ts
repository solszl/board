import AbstractCommand from './absCommand';
import { Point } from "../interfaces";
import { CommandEnum } from "./commandEnum";
import { UndoManager } from "../manager/undoManager";
import Constants from "../constants";

export default class CircleCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.CIRCLE;
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
            let xpos = (this.path[0].$x + Math.abs((this.path[0].$x - this.path[1].$x) / 2)) * Constants.Ratio;
            let ypos = (this.path[0].$y + Math.abs((this.path[0].$y - this.path[1].$y) / 2)) * Constants.Ratio;
            let a = Math.abs(this.path[0].$x - this.path[1].$x) * Constants.Ratio / 2;
            let b = Math.abs(this.path[0].$y - this.path[1].$y) * Constants.Ratio / 2;

            this.ctx.ellipse(xpos, ypos, a, b, 0, 0, 2 * Math.PI, true);

            console.log(xpos, ypos, a, b, Constants.Ratio);
        }
        this.ctx.stroke();

        UndoManager.getInstance().push(this.getImageData());
    }
}