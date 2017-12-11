import CommandManager from './manager/commandManager';
import PenCommand from './cmd/penCommand';
import BoardOption from "./cmd/option";
import ClearCommand from './cmd/clearCommand';
import { AbstractCommand } from './cmd/absCommand';
import EraserCommand from './cmd/eraserCommand';
import TextCommand from './cmd/textCommand';
import { CommandEnum } from './cmd/CommandEnum';
import { Point } from './interfaces';
import { UndoManager } from './manager/undoManager';
import { DataManager } from './manager/dataManager';
import { VEvent } from './events/events';
export default class Main {

    root: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    md: (e: MouseEvent) => void;
    currentCMD: AbstractCommand;
    /**
     * 构造函数。传入canvas
     * @param {HTMLCanvasElement} e 
     * @memberof Main
     */
    constructor(e: HTMLCanvasElement) {
        if (!!!e) {
            console.log("root node is null");
            return;
        }

        console.log("BoardCore initialized");
        console.log(this);
        this.root = e;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
        this.ctx.fillStyle = "lightgray";
        this.ctx.fillRect(0, 0, this.root.width, this.root.height);
        UndoManager.getInstance().push(this.ctx.getImageData(0, 0, this.root.width, this.root.height));
    }

    /**
     * 设置画板大小
     * 
     * @param {number} w 
     * @param {number} h 
     * @memberof Main
     */
    setSize(w: number, h: number): void {
        console.log("w:", w, "h:", h);
    }

    /**
     *  设置背景颜色,设置后即相当于白板功能
     * 
     * @param {number} color 
     * @memberof Main
     */
    setBackgroundColor(color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.root.width, this.root.height);
    }

    setPencil(): void {
        CommandManager.getInstance().execute(CommandEnum.PEN, this.root, this.opt);
    }

    setErase(): void {
        CommandManager.getInstance().execute(CommandEnum.EARSER, this.root, this.opt);
    }

    setText(): void {
        CommandManager.getInstance().execute(CommandEnum.TEXT, this.root, this.opt);
    }

    saveAsBitmap(): void {

    }

    clearAll(): void {
        CommandManager.getInstance().execute(CommandEnum.CLEAR, this.root, this.opt);
    }

    undo(): void {
        // CommandManager.getInstance().undo();
        var bmd: ImageData | undefined = UndoManager.getInstance().undo();
        if (bmd)
            this.ctx.putImageData(bmd as ImageData, 0, 0);
    }

    redo(): void {
        // CommandManager.getInstance().redo();
        var bmd: ImageData | undefined = UndoManager.getInstance().redo();
        if (bmd)
            this.ctx.putImageData(bmd as ImageData, 0, 0);
    }

    clearBoard(): void {
        CommandManager.getInstance().execute(CommandEnum.CLEAR, this.root, this.opt);
    }

    setBoardData(data: string): void {
        DataManager.getInstance().setData(data, this.root);
    }

    opt: BoardOption;
    setBoardOption(color: string, size: number, content: string): void {
        this.opt = new BoardOption();
        this.opt.color = color;
        this.opt.size = size;
        this.opt.content = content;
    }

    on(action: string, handler: Function) {
        VEvent.listen(action, handler);
    }
}