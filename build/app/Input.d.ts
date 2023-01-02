export default class Input {
    element: HTMLInputElement;
    isStarred: boolean;
    constructor();
    get value(): string;
    clear(): void;
    star(): void;
    unStar(): void;
    setupListeners(): void;
}
