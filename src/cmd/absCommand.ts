import { IUndoableCommand } from "./cmdInterface";
import BoardOption from "./option";
import { isNullOrUndefined } from "util";

export abstract class AbstractCommand implements IUndoableCommand {
    ctx: CanvasRenderingContext2D;
    root: HTMLCanvasElement;
    data: any;
    constructor(root: HTMLCanvasElement) {
        this.root = root;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
        this.data = {};
    }
    type: string;

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
     * 撤销
     * 
     * @memberof AbstractCommand
     */
    undo(): void {

    }

    /**
     * 重做
     * 
     * @memberof AbstractCommand
     */
    redo(): void {

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