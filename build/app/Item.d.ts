export default class Item {
    #private;
    content: string;
    id: string;
    isStarred: boolean;
    isDone: boolean;
    element: HTMLLIElement;
    constructor(content: string, id: string, isStarred: boolean, isDone: boolean);
    createItem(): void;
    get delete(): HTMLImageElement;
    get checkbox(): HTMLImageElement;
    get checkboxEmpty(): HTMLImageElement;
    get star(): HTMLImageElement;
    get starEmpty(): HTMLImageElement;
    toggleStarred(): void;
    toggleDone(): void;
    remove(): void;
    setupInput(): void;
}
