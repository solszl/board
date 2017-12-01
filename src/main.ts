import CommandManager from './cmd/commandManager';
class Main {
    constructor() {
        CommandManager.getInstance().redo();
        CommandManager.getInstance().undo();
    }

    setSize(w:number, h:number):void {
        
    }
}