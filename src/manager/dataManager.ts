import { CommandEnum } from "../cmd/commandEnum";
import AbstractCommand from "../cmd/absCommand";
import { CommandFactory } from "../cmd/cmdFactory";

export class DataManager {
    private static _instance: DataManager;

    static getInstance(): DataManager {
        if (!!!this._instance) {
            this._instance = new DataManager();
        }

        return this._instance;
    }

    constructor() {
        if (!!DataManager._instance)
            return;
        DataManager._instance = this;
    }

    setData(data: string, root: HTMLCanvasElement) {
        var obj: any = JSON.parse(data);
        if (!!!obj)
            return;
        var cmd: AbstractCommand = CommandFactory.getCommand(obj["type"], root);
        if (!!!cmd)
            return;

        cmd.fromJSON(data);
        cmd.drawByJSON();
    }
}