class BoardOption {
    constructor() {

    }

    /**
     * 颜色
     * 
     * @type {string}
     * @memberof BoardOption
     */
    color: string;

    /**
     * 大小，画笔大小，橡皮擦大小
     * 
     * @type {number}
     * @memberof BoardOption
     */
    size: number;

    /**
     * 内容
     * 
     * @type {string}
     * @memberof BoardOption
     */
    content: string;

    toString(): string {
        return `color:${this.color}, size:${this.size}, content:${this.content}`;
    }

    static fromObj(data: any): BoardOption {
        var opt: BoardOption = new BoardOption();
        opt.color = data['color'];
        opt.content = data['content'];
        opt.size = data['size'];
        return opt;
    }
}

export default BoardOption;
