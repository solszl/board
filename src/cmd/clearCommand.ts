import { AbstractCommand } from "./absCommand";

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
        this.type = "clear_command";
    }

    execute() {
        super.execute();
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);
    }
}