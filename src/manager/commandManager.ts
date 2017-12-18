import AbstractCommand from '../cmd/absCommand';
import { CommandFactory } from '../cmd/cmdFactory';
import { UndoManager } from "../manager/undoManager";
import BoardOption from "../cmd/option";

class CommandManager {

    private static instance: CommandManager;

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
}

export default CommandManager;