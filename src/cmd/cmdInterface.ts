export interface ICommand {
    type: string;
    execute(): void;
}