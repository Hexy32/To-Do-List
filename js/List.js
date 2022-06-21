import PlaceholderItem from './PlaceholderItem.js';
import Item from './Item.js';
export const itemTemplate = document.getElementById('item');
export const placeholderItemTemplate = document.getElementById('placeholder-item');
export const list = document.getElementById('list');
export default class List {
    itemsPerPage;
    constructor(items, itemsPerPage = 6) {
        this.itemsPerPage = itemsPerPage;
        if (items != null) {
            this.#items = items;
            this.addItems(this.#items);
        }
        else {
            this.createBlankItems();
        }
    }
    #placeholderItems = [];
    #items = [];
    addItems(items) {
        items.forEach((item) => {
            this.removeBlankItem();
            this.createItem(item.content, item.id, item.isStarred, item.isDone);
        });
        if (this.#items.length < this.itemsPerPage) {
            this.createBlankItems();
        }
    }
    createItem(content, id, isStarred, isDone) {
        this.removeBlankItem();
        const item = new Item(content, id, isStarred, isDone);
        this.#items.push(item);
    }
    removeBlankItem() {
        if (this.totalItems.length >= this.itemsPerPage &&
            this.#placeholderItems.length > 0) {
            this.#placeholderItems.pop().remove();
        }
    }
    get totalItems() {
        const totalItems = [].concat(this.#items, this.#placeholderItems);
        return totalItems;
    }
    createBlankItems() {
        const numberOfBlanks = this.#items == undefined
            ? this.itemsPerPage
            : this.itemsPerPage - this.#items.length;
        for (let i = 0; i < numberOfBlanks; i++) {
            const placeholderItem = new PlaceholderItem();
            this.#placeholderItems.push(placeholderItem);
        }
    }
}
