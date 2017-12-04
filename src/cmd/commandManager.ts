import { AbstractCommand } from "./absCommand";
import { IUndoableCommand } from "./cmdInterface";

class CommandManager {

    private static instance: CommandManager;

    private static MAX_COUNT:number = 10;

    stack:Array<IUndoableCommand>;

    constructor() {
    }

    static getInstance(): CommandManager {
        if (this.instance === null || this.instance === undefined)
            this.instance = new CommandManager();

        return this.instance;
    }


    currentCMD: AbstractCommand;

    execute(): void {
        if (this.currentCMD === null || this.currentCMD === undefined)
            return;

        this.currentCMD.execute();
    }

    undo() {

    }

    redo() {

    }


    private turncate(stack:Array<IUndoableCommand>):void {

    }
}

export default CommandManager;