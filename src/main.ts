import CommandManager from './manager/commandManager';
import PenCommand from './cmd/penCommand';
import BoardOption from "./cmd/option";
import ClearCommand from './cmd/clearCommand';
import AbstractCommand from './cmd/absCommand';
import EraserCommand from './cmd/eraserCommand';
import TextCommand from './cmd/textCommand';
import { CommandEnum } from './cmd/commandEnum';
import { Point } from './interfaces';
import { UndoManager } from './manager/undoManager';
import { DataManager } from './manager/dataManager';
import { VEvent } from './events/events';
import Constants from './constants';
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

        this.root = e;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
        // 设置背景色，保存起来状态
        this.ctx.fillStyle = "rgba(255,255,255,0)";
        // this.ctx.fillRect(0, 0, this.root.width, this.root.height);
        // this.setSize(this.root.width, this.root.height);
        this.clearAll();
        Constants.OriginHeight = e.height;
        Constants.OriginWidth = e.width;
        Constants.OriginXPos = e.offsetLeft;
        Constants.OriginYPos = e.offsetTop;
        Constants.OriginPoint = new Point(Constants.OriginXPos, Constants.OriginYPos);
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
        this.clearAll();
        this.root.width = w;
        this.root.height = h;
        Constants.Ratio = Math.min(w / Constants.OriginWidth, h / Constants.OriginHeight);
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
        var image = this.root.toDataURL("image/png").replace("iamge/png", "image/octet-stream");
        window.location.href = image;
    }

    setNitePencil(): void {
        CommandManager.getInstance().execute(CommandEnum.NITE_PEN, this.root, this.opt);
    }

    undo(): void {
        CommandManager.getInstance().execute(CommandEnum.UNDO, this.root, this.opt);
    }

    redo(): void {
        CommandManager.getInstance().execute(CommandEnum.REDO, this.root, this.opt);
    }

    clearBoard(): void {
        CommandManager.getInstance().execute(CommandEnum.CLEAR, this.root, this.opt);
    }

    setBoardData(data: string): void {
        DataManager.getInstance().setData(data, this.root);
    }

    /** 取消所有操作*/
    cancelOperate() {
        if (!!CommandManager.getInstance().lastCMD)
            CommandManager.getInstance().lastCMD.complete();
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

    clearAll() {
        this.ctx.clearRect(0, 0, this.root.width, this.root.height);
        if (this.background) {
            this.ctx.drawImage(this.background, 0, 0, this.root.width, this.root.height);
        }
    }

    changeElement(e: HTMLCanvasElement) {
        this.root = e;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
        // 设置背景色，保存起来状态
        this.ctx.fillStyle = "rgba(255,255,255,0)";
        // this.ctx.fillRect(0, 0, this.root.width, this.root.height);
        // this.setSize(this.root.width, this.root.height);
        this.clearAll();
        Constants.OriginHeight = e.height;
        Constants.OriginWidth = e.width;
        Constants.OriginXPos = e.offsetLeft;
        Constants.OriginYPos = e.offsetTop;
        Constants.OriginPoint = new Point(Constants.OriginXPos, Constants.OriginYPos);
    }

    background: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    setBackground(el: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) {
        if (!!el) {
            this.background = el;
        }
    }
}