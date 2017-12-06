import { AbstractCommand } from "./absCommand";
import { Point } from "../interfaces";
/**
 *  画笔工具
 * 
 * @export
 * @class PenCommand
 * @extends {AbstractCommand}
 */
export default class PenCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = "pen_command";
    }

    execute(): void {
        super.execute();
        if (this.opt === null || this.opt === undefined)
            return;

        this.md = this.onMouseDownHandler.bind(this);
        this.mm = this.onMouseMovehandler.bind(this);
        this.mu = this.onMouseUpHandler.bind(this);
        this.bindEvents();
    }

    // 声明几个函数
    private md: (e: MouseEvent) => {};
    private mm: (e: MouseEvent) => {};
    private mu: (e: MouseEvent) => {};
    // 注册鼠标事件
    private bindEvents(): void {
        console.log(this);
        this.root.addEventListener("mousedown", this.md);
    }

    // 移除鼠标事件
    private unbindEvents(): void {
        this.root.removeEventListener("mousedown", this.md);
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
    }

    private startPos: Point;
    private endPos: Point;
    private onMouseDownHandler(e: MouseEvent): void {
        // 鼠标按下的时候，移除down，添加move 和 up 监听
        // 鼠标抬起的时候，移除move 和 up， 添加down监听，保证同时只有一个监听事件
        this.root.removeEventListener("mousedown", this.md);
        this.root.addEventListener("mousemove", this.mm);
        this.root.addEventListener("mouseup", this.mu);
        this.startPos = new Point(e.layerX, e.layerY);
        // 设置线条宽度
        this.ctx.lineWidth = this.opt.size;
        // 设置颜色
        this.ctx.strokeStyle = this.opt.color;
        // 设置定点的样式
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startPos.x, this.startPos.y);
    }

    private onMouseMovehandler(e: MouseEvent): void {
        this.ctx.lineTo(e.layerX, e.layerY);
        this.ctx.stroke();
    }

    private onMouseUpHandler(e: MouseEvent): void {
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
        this.root.addEventListener("mousedown", this.md);
        this.endPos = new Point(e.layerX, e.layerY);
    }

    complete() {
        super.complete();
        this.unbindEvents();
    }
}
