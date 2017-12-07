import { AbstractCommand } from "./absCommand";

/**
 *  文本命令
 * 
 * @export
 * @class TextCommand
 * @extends {AbstractCommand}
 */
export default class TextCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = "text_command";
    }

    // 声明几个函数
    private md: (e: MouseEvent) => {};
    private mm: (e: MouseEvent) => {};
    private mu: (e: MouseEvent) => {};
    execute(): void {
        super.execute();
        if (this.opt === null || this.opt === undefined)
            return;

        this.md = this.onMouseDownHandler.bind(this);
        this.mm = this.onMouseMovehandler.bind(this);
        this.mu = this.onMouseUpHandler.bind(this);

        this.bindEvents();
        this.ctx.font = this.opt.size + "px Arial";
        this.ctx.fillStyle = this.opt.color;
    }

    // 注册鼠标事件
    private bindEvents(): void {
        this.root.addEventListener("mousedown", this.md);
    }

    // 移除鼠标事件
    private unbindEvents(): void {
        this.root.removeEventListener("mousedown", this.md);
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
    }

    // 这个bmd是为了 保存一下上下文，当鼠标移动的时候，重绘，添加文本
    bmd: ImageData;
    private onMouseDownHandler(e: MouseEvent): void {
        // 鼠标按下的时候，移除down，添加move 和 up 监听
        // 鼠标抬起的时候，移除move 和 up， 添加down监听，保证同时只有一个监听事件
        this.root.removeEventListener("mousedown", this.md);
        this.root.addEventListener("mousemove", this.mm);
        this.root.addEventListener("mouseup", this.mu);

        this.bmd = this.ctx.getImageData(0, 0, this.root.width, this.root.height);
        var str: string = this.opt.content;
        this.ctx.fillText(str, e.layerX, e.layerY);
    }

    private onMouseMovehandler(e: MouseEvent): void {
        this.ctx.putImageData(this.bmd, 0, 0);
        var str: string = this.opt.content;
        this.ctx.fillText(str, e.layerX, e.layerY);
    }

    private onMouseUpHandler(e: MouseEvent): void {
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
        this.root.addEventListener("mousedown", this.md);
    }

    complete() {
        super.complete();
        this.unbindEvents();
    }
}