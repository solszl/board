import { IUndoableCommand } from "./cmdInterface";
import { CommandEnum } from "./CommandEnum";
import ClearCommand from "./clearCommand";
import { AbstractCommand } from "./absCommand";
import EraserCommand from "./eraserCommand";
import PenCommand from "./penCommand";
import TextCommand from "./textCommand";

export class CommandFactory {
    static getCommand(type: string, root: HTMLCanvasElement): AbstractCommand {
        var cmd: AbstractCommand;

        switch (type) {
            case CommandEnum.CLEAR:
                cmd = new ClearCommand(root);
                break;
            case CommandEnum.EARSER:
                cmd = new EraserCommand(root);
                break;
            case CommandEnum.PEN:
                cmd = new PenCommand(root);
                break;
            case CommandEnum.TEXT:
                cmd = new TextCommand(root);
                break;
            default:
                cmd = new ClearCommand(root);
                break;
        }

        return cmd;
    }
}