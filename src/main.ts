import CommandManager from './cmd/commandManager';
import PenCommand from './cmd/penCommand';
import BoardOption from "./cmd/option";
import ClearCommand from './cmd/clearCommand';
import { AbstractCommand } from './cmd/absCommand';
import EraserCommand from './cmd/eraserCommand';
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
        if (e === null || e === undefined) {
            console.log("root node is null");
            return;
        }

        console.log("BoardCore initialized");
        console.log(this);
        this.root = e;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
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
    }

    setPencil(): void {
        if (this.currentCMD) {
            this.currentCMD.complete();
        }
        var cmd: PenCommand = new PenCommand(this.root);
        this.currentCMD = cmd;
        cmd.opt = this.opt;
        console.log(this.opt.toString());
        cmd.execute();
    }

    setErase(): void {
        if (this.currentCMD) {
            this.currentCMD.complete();
        }
        var cmd: EraserCommand = new EraserCommand(this.root);
        cmd.opt = this.opt;
        cmd.execute();
    }

    setText(): void {

    }

    saveAsBitmap(): void {

    }

    clearAll(): void {

    }

    undo(): void {
        CommandManager.getInstance().undo();
    }

    redo(): void {
        CommandManager.getInstance().redo();
    }

    clearBoard(): void {
        if (this.currentCMD) {
            this.currentCMD.complete();
        }
        var cmd: ClearCommand = new ClearCommand(this.root);
        this.currentCMD = cmd;
        cmd.opt = this.opt;
        cmd.execute();
    }

    setBoardData(data: string): void {
        var oringin: string = '{"type":2}';
        var obj: any = JSON.parse(oringin);
        console.log(obj.type);
    }

    opt: BoardOption;
    setBoardOption(color: string, size: number, content: string): void {
        this.opt = new BoardOption();
        this.opt.color = color;
        this.opt.size = size;
        this.opt.content = content;
    }
}