import { IUndoableCommand } from "./cmdInterface";
import BoardOption from "./option";
import { isNullOrUndefined } from "util";

export abstract class AbstractCommand implements IUndoableCommand {
    ctx: CanvasRenderingContext2D;
    root: HTMLCanvasElement;
    constructor(root: HTMLCanvasElement) {
        this.root = root;
        this.ctx = this.root.getContext("2d") as CanvasRenderingContext2D;
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
}