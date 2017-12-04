import CommandManager from './cmd/commandManager';
import { Context } from 'vm';
export default class Main {

    root: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
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
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.root.width,this.root.height);
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
}