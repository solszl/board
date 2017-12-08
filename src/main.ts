import CommandManager from './cmd/commandManager';
import PenCommand from './cmd/penCommand';
import BoardOption from "./cmd/option";
import ClearCommand from './cmd/clearCommand';
import { AbstractCommand } from './cmd/absCommand';
import EraserCommand from './cmd/eraserCommand';
import TextCommand from './cmd/textCommand';
import { CommandEnum } from './cmd/CommandEnum';
import { Point } from './interfaces';
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
        //{"type":"pen_command","path":[{"x":247,"y":165},{"x":248,"y":165},{"x":250,"y":165},{"x":251,"y":165},{"x":252,"y":165},{"x":253,"y":165},{"x":254,"y":165},{"x":255,"y":165},{"x":255,"y":165}],"opt":{"color":"#000000","size":"4","content":""}}
        // var data: string = '{"type":"pen_command","path":[{"x":247,"y":165},{"x":248,"y":165},{"x":250,"y":165},{"x":251,"y":165},{"x":252,"y":165},{"x":253,"y":165},{"x":254,"y":165},{"x":255,"y":165},{"x":255,"y":165}],"opt":{"color":"#000000","size":"4","content":""}}';
        // var o: any = JSON.parse(data);
        // var type: string = o['type'];
        // var path: Array<Point> = [];
        // // Array<Point>(o['path']).every((val, idx, arr) => {
        // //     path.push(Point.from(arr[idx]));
        // //     return true;
        // // });
        // // console.log(o.path);
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

    }

    undo(): void {
        CommandManager.getInstance().undo();
    }

    redo(): void {
        CommandManager.getInstance().redo();
    }

    clearBoard(): void {
        CommandManager.getInstance().execute(CommandEnum.CLEAR, this.root, this.opt);
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