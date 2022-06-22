import PlaceholderItem from './PlaceholderItem.js';
import Item from './Item.js';
const HTMLlist = document.getElementById('list');
export default class List {
    itemsPerPage;
    placeholderItems;
    items;
    constructor(items, itemsPerPage = 6) {
        this.itemsPerPage = itemsPerPage;
        this.placeholderItems = [];
        this.items = [];
        if (items != null) {
            this.items = items;
            this.addItems(this.items);
        }
        else {
            this.createBlankItems();
        }
    }
    addItems(items) {
        items.forEach((item) => {
            this.removeBlankItem();
            this.createItem(item.content, item.id, item.isStarred, item.isDone);
        });
        if (this.items.length < this.itemsPerPage) {
            this.createBlankItems();
        }
    }
    createItem(content, id, isStarred = false, isDone = false) {
        if (id == null) {
            id = JSON.stringify(Date.now());
        }
        this.removeBlankItem();
        const item = new Item(content, id, isStarred, isDone);
        this.appendItem(item);
        this.setupDelete(item);
    }
    appendItem(item) {
        if (this.items.length == 0 || item.isStarred) {
            HTMLlist.prepend(item.element);
            this.items.unshift(item);
            return;
        }
        const lastItemElement = this.items[this.items.length - 1].element;
        lastItemElement.insertAdjacentElement('afterend', item.element);
        this.items.push(item);
    }
    removeBlankItem() {
        if (this.totalItemsLength >= this.itemsPerPage &&
            this.placeholderItems.length > 0) {
            this.placeholderItems.pop().remove();
        }
    }
    deleteItem(item) {
        item.remove();
        const index = this.items.findIndex((i) => {
            return i.id === item.id;
        });
        this.items.splice(index, 1);
        this.createBlankItem();
    }
    setupDelete(item) {
        item.delete.addEventListener('click', () => {
            this.deleteItem(item);
        });
    }
    createBlankItems() {
        const numberOfBlanks = this.items == undefined
            ? this.itemsPerPage
            : this.itemsPerPage - this.items.length;
        for (let i = 0; i < numberOfBlanks; i++) {
            const placeholderItem = new PlaceholderItem();
            HTMLlist.append(placeholderItem.element);
            this.placeholderItems.push(placeholderItem);
        }
    }
    createBlankItem() {
        if (this.itemsPerPage < this.totalItemsLength + 1)
            return;
        const placeholderItem = new PlaceholderItem();
        HTMLlist.append(placeholderItem.element);
        this.placeholderItems.push(placeholderItem);
    }
    get totalItemsLength() {
        const totalItems = [].concat(this.items, this.placeholderItems);
        return totalItems.length;
    }
}
