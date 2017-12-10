import { ICommand } from "./cmdInterface";
import BoardOption from "./option";
import { isNullOrUndefined } from "util";
import { Point } from "../interfaces";

export abstract class AbstractCommand implements ICommand {
    ctx: CanvasRenderingContext2D;
    root: HTMLCanvasElement;
    data: any;
    constructor(root: HTMLCanvasElement) {
        this.root = root;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
        this.data = {};
        this.path = [];
    }
    type: string;

    path: Array<Point>;

    opt: BoardOption;

    /**
     * 执行
     * 
     * @memberof AbstractCommand
     */
    execute(): void {

    }

    /**
     * 完成
     * 
     * @memberof AbstractCommand
     */
    complete(): void {
        this.unbindEvents();
    }

    /**
     * 数据JSON化
     * 
     * @returns {string} 
     * @memberof AbstractCommand
     */
    toJSON(): string {
        return "{}";
    }

    /**
     * 数据从JSON还原
     * 
     * @param {string} data 
     * @returns 
     * @memberof AbstractCommand
     */
    fromJSON(data: string) {
        if (data === "")
            return;

        var o: any = JSON.parse(data);
        var arr: Array<any> = o['path'];
        var p: Array<Point> = [];
        arr.forEach((val, idx, arr) => {
            this.path.push(Point.from(val));
        });
        this.opt = BoardOption.fromObj(o['opt']);
    }

    drawByJSON() {

    }

    /**
     * 获取当前canvas的ImageData
     * 
     * @protected
     * @returns {ImageData} 
     * @memberof AbstractCommand
     */
    protected getImageData(): ImageData {
        var bmd: ImageData = this.ctx.getImageData(0, 0, this.root.width, this.root.height);
        return bmd;
    }

    // 声明几个函数
    protected md: (e: MouseEvent) => {};
    protected mm: (e: MouseEvent) => {};
    protected mu: (e: MouseEvent) => {};

    // 注册鼠标事件
    protected bindEvents(): void {
        this.md = this.onMouseDownHandler.bind(this);
        this.mm = this.onMouseMovehandler.bind(this);
        this.mu = this.onMouseUpHandler.bind(this);
        this.root.addEventListener("mousedown", this.md);
    }

    // 移除鼠标事件
    protected unbindEvents(): void {
        this.root.removeEventListener("mousedown", this.md);
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
    }

    protected onMouseDownHandler(e: MouseEvent): void {
        // 鼠标按下的时候，移除down，添加move 和 up 监听
        // 鼠标抬起的时候，移除move 和 up， 添加down监听，保证同时只有一个监听事件
        this.root.removeEventListener("mousedown", this.md);
        this.root.addEventListener("mousemove", this.mm);
        this.root.addEventListener("mouseup", this.mu);
    }
    protected onMouseMovehandler(e: MouseEvent): void { }
    protected onMouseUpHandler(e: MouseEvent): void {
        this.root.removeEventListener("mousemove", this.mm);
        this.root.removeEventListener("mouseup", this.mu);
        this.root.addEventListener("mousedown", this.md);
    }
}