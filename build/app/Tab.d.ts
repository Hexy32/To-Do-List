import List from './List';
export default class Tab {
    #private;
    element: HTMLLIElement;
    name: string;
    id: string;
    selected: boolean;
    savedList: List;
    completed: boolean;
    constructor(name: string | undefined, list: List, id?: string, completed?: boolean);
    createTab(name: string, list: List, id: string, completed: boolean): void;
    setupInput(): void;
    select(): void;
    deselect(): void;
    complete(): void;
    unComplete(): void;
    remove(): void;
    updateName(updateTab?: boolean): void;
}
