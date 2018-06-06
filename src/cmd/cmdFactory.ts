import { CommandEnum } from "./commandEnum";
import ClearCommand from "./clearCommand";
import AbstractCommand from "./absCommand";
import EraserCommand from "./eraserCommand";
import PenCommand from "./penCommand";
import TextCommand from "./textCommand";
import UndoCommand from "./undoCommand";
import RedoCommand from "./redoCommand";
import RectCommand from "./rectCommand";
import CircleCommand from "./circleCommand";
import NightPenCommand from "./nitePenCommand";

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
            case CommandEnum.UNDO:
                cmd = new UndoCommand(root);
                break;
            case CommandEnum.REDO:
                cmd = new RedoCommand(root);
                break;
            case CommandEnum.RECT:
                cmd = new RectCommand(root);
                break;
            case CommandEnum.CIRCLE:
                cmd = new CircleCommand(root);
                break;
            case CommandEnum.NITE_PEN:
                cmd = new NightPenCommand(root);
                break;
            default:
                cmd = new ClearCommand(root);
                break;
        }

        return cmd;
    }
}