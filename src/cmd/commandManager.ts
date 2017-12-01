class CommandManager {

    private static instance: CommandManager;

    constructor() {
    }

    static getInstance(): CommandManager {
        if (this.instance === null || this.instance === undefined)
            this.instance = new CommandManager();

        return this.instance;
    }

    undo() {

    }

    redo() {

    }
}

export default CommandManager;