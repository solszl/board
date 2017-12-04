import { AbstractCommand } from "./absCommand";

/**
 *  画笔工具
 * 
 * @export
 * @class PenCommand
 * @extends {AbstractCommand}
 */
export default class PenCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = "pen_command";
    }

    execute(): void {
        super.execute();
        if (this.opt === null || this.opt === undefined)
            return;
    }
}