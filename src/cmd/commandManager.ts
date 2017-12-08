import { AbstractCommand } from "./absCommand";
import { IUndoableCommand } from "./cmdInterface";
import { CommandFactory } from "./cmdFactory";
import BoardOption from "./option";

class CommandManager {

    private static instance: CommandManager;

    private static MAX_COUNT: number = 10;

    stack: Array<IUndoableCommand>;

    constructor() {
    }

    static getInstance(): CommandManager {
        if (!!!this.instance)
            this.instance = new CommandManager();

        return this.instance;
    }

    currentCMD: AbstractCommand;
    lastCMD: AbstractCommand;
    execute(type: string, root: HTMLCanvasElement, opt: BoardOption): void {
        if (!!this.lastCMD) {
            this.lastCMD.complete();
        }
        this.currentCMD = CommandFactory.getCommand(type, root);
        this.currentCMD.opt = opt;
        this.currentCMD.execute();

        this.lastCMD = this.currentCMD;
    }

    undo() {

    }

    redo() {

    }


    private turncate(stack: Array<IUndoableCommand>): void {

    }
}

export default CommandManager;