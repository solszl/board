import CommandManager from './cmd/commandManager';
import { Context } from 'vm';
export default class Main {

    root: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    md: (e:MouseEvent) => void;
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
        this.md = this.onMouseDownHandler;
        console.log("aaa");
        this.root.addEventListener("mousedown", this.md);
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

    }

    setErase(): void {

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

    private onMouseDownHandler(e: MouseEvent): void {
        console.log(this,e.target);

        this.root.removeEventListener("mousedown", this.md);

        console.log("aaa");
        // this.root.removeEventListener("mousedown", this.onMouseDownHandler);
        // this.root.addEventListener("mousemove", this.onMouseMoveHandler);
        // this.root.addEventListener("mouseup", this.onMouseUpHandler);
        // this.ctx.beginPath();
        // this.ctx.moveTo(e.layerX, e.layerY);
        // console.log("mouse_down");
    }

    private onMouseMoveHandler(e: MouseEvent): void {
        this.ctx.lineTo(e.layerX, e.layerY);
        this.ctx.stroke();
    }

    private onMouseUpHandler(e: MouseEvent): void {
        this.root.removeEventListener("mouseup", this.onMouseUpHandler);
        this.root.removeEventListener("mousemove", this.onMouseMoveHandler);
        this.root.addEventListener("mousedown", this.onMouseDownHandler);

        console.log("mouse_up");
    }
}