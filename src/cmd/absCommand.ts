import { IUndoableCommand } from "./cmdInterface";

export abstract class AbstractCommand implements IUndoableCommand {
    constructor() {

    }
    type: string;

    execute(): void {

    }
    
    undo(): void {

    }

    redo(): void {

    }
}