export class UndoManager {
    // 最大缓存数量
    static readonly MAX_CACHE_COUNT: number = 10;
    private static _instance: UndoManager;

    // 数据缓存
    private dataCache: Array<ImageData>;

    private currentIdx: number;
    static getInstance(): UndoManager {
        if (!!!this._instance) {
            this._instance = new UndoManager();
        }

        return this._instance;
    }

    constructor() {
        if (!!UndoManager._instance) {
            throw new Error("UndoManager is singlton");
        }

        UndoManager._instance = this;
        // 初始化缓存器
        this.dataCache = [];
        // 重置索引位置
        this.currentIdx = 0;
    }

    undo(): ImageData | undefined {
        if (!this.canUndo()) {
            return;
        }

        this.currentIdx--;
        return this.dataCache[this.currentIdx];
    }

    redo(): ImageData | undefined {
        if (!this.canRedo()) {
            return;
        }
        this.currentIdx++;
        return this.dataCache[this.currentIdx];
    }

    /**
     * 清空undo列表
     * 
     * @memberof UndoManager
     */
    clear() {
        this.currentIdx = 0;
        this.dataCache = [];
    }

    push<T extends ImageData>(data: T) {
        // 如果索引大于最大缓存数，整理缓存列表
        this.truncate();
        // 重置索引
        this.currentIdx = Math.min(this.currentIdx, this.dataCache.length - 1);
        // 重置数据缓存
        this.dataCache = this.dataCache.slice(0, this.currentIdx + 1);
        this.dataCache.push(data);
        this.currentIdx++;
    }

    private truncate() {
        while (this.dataCache.length > UndoManager.MAX_CACHE_COUNT) {
            this.dataCache.shift();
        }
    }

    readonly canUndo = () => this.currentIdx > -1;

    readonly canRedo = () => this.currentIdx < this.dataCache.length - 1;
}