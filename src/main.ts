import CommandManager from './cmd/commandManager';
import { log } from 'util';
export default class Main {
    constructor() {
        CommandManager.getInstance().redo();
        CommandManager.getInstance().undo();
    }

    setSize(w: number, h: number): void {
        console.log("w:", w, "h:", h);
    }
}