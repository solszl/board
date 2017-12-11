/**
 * 简单的实现了一个发布订阅
 * 
 * @export
 * @class VEvent
 */
export class VEvent {

    private static listeners: any = {};

    static listen(key: string, handler: Function) {
        if (!!!this.listeners[key])
            this.listeners[key] = new Array<Function>();

        var arr: Array<Function> = this.listeners[key];
        arr.push(handler);
    }

    static trigger(action: string, ...args: any[]) {
        if (!!this.listeners[action]) {
            (this.listeners[action] as Array<Function>).forEach((val, idx, arr) => {
                (val as Function).apply(null, args);
            });
        }
    }

    static remove(action: string, handler: Function) {
        if (!!!this.listeners[action])
            return;
        var arr = Array(this.listeners[action]);
        if (arr.indexOf(handler) > -1) {
            arr.slice(arr.indexOf(handler), 1);
        }
        if (arr.length = 0) {
            delete this.listeners[action];
        }
    }
}

export enum VEventEnum {
    Add = "add"
}