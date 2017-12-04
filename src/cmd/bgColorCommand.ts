import { AbstractCommand } from "./absCommand";

export default class BgColorCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = "background_color_command";
    }

    execute(): void {
        super.execute();
    }
}