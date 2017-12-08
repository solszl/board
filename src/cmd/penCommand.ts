import { AbstractCommand } from "./absCommand";
import { Point } from "../interfaces";
import { CommandEnum } from "./CommandEnum";
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
        this.type = CommandEnum.PEN;
        this.data['type'] = this.type;
        this.path = [];
    }

    path: Array<Point>;
    execute(): void {
        super.execute();
        if (!!!this.opt)
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
        this.path = [];
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
        // 设置拐点样式
        this.ctx.lineJoin = "round";
        // 像素叠加属性 from:https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.beginPath();
        this.ctx.moveTo(this.startPos.x, this.startPos.y);
        this.path.push(new Point(this.startPos.x, this.startPos.y));
    }

    private onMouseMovehandler(e: MouseEvent): void {
        this.ctx.lineTo(e.layerX, e.layerY);
        this.ctx.stroke();
        this.path.push(new Point(e.layerX, e.layerY));
    }

    private onMouseUpHandler(e: MouseEvent): void {
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
        this.root.addEventListener("mousedown", this.md);
        this.endPos = new Point(e.layerX, e.layerY);
        this.path.push(this.endPos);
        this.toJSON();
    }

    complete() {
        super.complete();
        this.unbindEvents();
        this.path = [];
    }

    toJSON(): string {
        this.data["path"] = this.path;
        this.data["opt"] = this.opt;
        var s: string = JSON.stringify(this.data);
        console.log(s, this.data['type']);
        return JSON.stringify(this.data);
    }

    fromJSON(data: string) {
        //{"type":"pen_command","path":[{"x":247,"y":165},{"x":248,"y":165},{"x":250,"y":165},{"x":251,"y":165},{"x":252,"y":165},{"x":253,"y":165},{"x":254,"y":165},{"x":255,"y":165},{"x":255,"y":165}],"opt":{"color":"#000000","size":"4","content":""}}
    }
}
