import { AbstractCommand } from "./absCommand";
import { CommandEnum } from "./CommandEnum";

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
    }

    execute() {
        super.execute();
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);
    }
}