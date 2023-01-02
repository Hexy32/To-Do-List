import PlaceholderItem from './PlaceholderItem.js';
import Item from './Item.js';
export default class List {
    itemsPerPage: number;
    placeholderItems: PlaceholderItem[];
    items: Item[];
    constructor(itemsPerPage?: number);
    updateHTML(): void;
    createItems(items: Item[]): void;
    createItem(content: string, id?: string, isStarred?: boolean, isDone?: boolean): void;
    private appendItem;
    removeBlankItem(): void;
    deleteItem(item: Item): void;
    setupInput(item: Item): void;
    starItem(item: Item): void;
    unStarItem(item: Item): void;
    createBlankItems(): void;
    createBlankItem(): void;
    loadData(data: Item[], urlLoad?: boolean): void;
    removeURLData(): void;
    get totalItemsLength(): number;
    get totalItems(): number;
    get completedItems(): number;
    get todoItems(): number;
    remove(): void;
}
