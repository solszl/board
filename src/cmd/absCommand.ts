import { IUndoableCommand } from "./cmdInterface";
import BoardOption from "./option";

export abstract class AbstractCommand implements IUndoableCommand {
    ctx:CanvasRenderingContext2D;
    root:HTMLCanvasElement;
    constructor(root:HTMLCanvasElement) {
        this.root = root;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
    }
    type: string;

    opt: BoardOption;

    execute(): void {

    }

    complete():void {

    }
    
    undo(): void {

    }

    redo(): void {

    }
}