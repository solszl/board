interface ICommand {
    type:string;
    execute():void;
}

export interface IUndoableCommand extends ICommand {
    undo():void;
    redo():void;
}