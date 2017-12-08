import { AbstractCommand } from "./absCommand";
import { CommandEnum } from "./CommandEnum";

export default class EraserCommand extends AbstractCommand {
    constructor(root: HTMLCanvasElement) {
        super(root);
        this.type = CommandEnum.EARSER;
    }

    // 声明几个函数
    private md: (e: MouseEvent) => {};
    private mm: (e: MouseEvent) => {};
    private mu: (e: MouseEvent) => {};

    execute() {
        if (!!!this.opt)
            return;
        this.md = this.onMouseDownHandler.bind(this);
        this.mm = this.onMouseMovehandler.bind(this);
        this.mu = this.onMouseUpHandler.bind(this);
        this.bindEvents();
    }

    complete() {
        super.complete();
        this.unbindEvents();
        this.ctx.globalCompositeOperation = "source-over";
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

    private onMouseDownHandler(e: MouseEvent): void {
        // 鼠标按下的时候，移除down，添加move 和 up 监听
        // 鼠标抬起的时候，移除move 和 up， 添加down监听，保证同时只有一个监听事件
        this.root.removeEventListener("mousedown", this.md);
        this.root.addEventListener("mousemove", this.mm);
        this.root.addEventListener("mouseup", this.mu);
        // 设置线条宽度
        this.ctx.lineWidth = this.opt.size;
        // 设置颜色
        this.ctx.strokeStyle = this.opt.color;
        // 设置定点的样式
        this.ctx.lineCap = "round";
        // 设置拐点样式
        this.ctx.lineJoin = "round";
        this.ctx.globalCompositeOperation = "destination-out";
        this.ctx.beginPath();
    }

    private onMouseMovehandler(e: MouseEvent): void {
        this.ctx.lineTo(e.layerX, e.layerY);
        this.ctx.stroke();
    }

    private onMouseUpHandler(e: MouseEvent): void {
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
        this.root.addEventListener("mousedown", this.md);
    }
}