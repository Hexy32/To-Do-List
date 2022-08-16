import PlaceholderItem from '../Items/PlaceholderItem.js';
import Item from '../Items/Item.js';
const HTMLlist = document.getElementById('list');
export default class List {
    itemsPerPage;
    placeholderItems;
    items;
    constructor(itemsPerPage = 6) {
        this.itemsPerPage = itemsPerPage;
        document.documentElement.style.setProperty('--total-items', itemsPerPage.toString());
        this.placeholderItems = [];
        this.items = [];
        this.createBlankItems();
    }
    updateHTML() {
        const loadedItems = this.items;
        this.items = [];
        this.createItems(loadedItems);
        this.createBlankItems();
    }
    createItems(items) {
        items.forEach((item) => {
            this.removeBlankItem();
            this.createItem(item.content, item.id, item.isStarred, item.isDone);
        });
    }
    createItem(content, id, isStarred = false, isDone = false) {
        if (id == null) {
            id = `ID${Date.now()}`;
        }
        this.removeBlankItem();
        const item = new Item(content, id, isStarred, isDone);
        this.appendItem(item);
        this.setupInput(item);
        HTMLlist.scrollTop = HTMLlist.scrollHeight;
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
    setupInput(item) {
        item.delete.addEventListener('click', () => {
            this.deleteItem(item);
        });
        item.starEmpty.addEventListener('click', () => {
            this.starItem(item);
        });
        item.star.addEventListener('click', () => {
            this.unStarItem(item);
        });
    }
    starItem(item) {
        this.createItem(item.content, undefined, item.isStarred, item.isDone);
        this.deleteItem(item);
    }
    unStarItem(item) {
        this.deleteItem(item);
        this.createItem(item.content, undefined, item.isStarred, item.isDone);
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
    loadData(data, urlLoad = false) {
        const listElem = document.getElementById('list');
        if (urlLoad) {
            let URLRawData = decodeURI(window.location.hash);
            URLRawData = '#';
            data = JSON.parse(URLRawData.slice(1));
        }
        data.forEach((item) => {
            item.element = listElem.querySelector(`#${item.id}`);
        });
        this.createItems(data);
        console.log(`Parsed 'localStorage data' as`, data);
    }
    removeURLData() {
        window.location.hash = '';
    }
    get totalItemsLength() {
        return this.items.length + this.placeholderItems.length;
    }
    get totalItems() {
        return this.items.length;
    }
    get completedItems() {
        let x = 0;
        this.items.forEach((item) => {
            if (item.isDone !== true)
                return;
            x++;
        });
        return x;
    }
    get todoItems() {
        return this.totalItems - this.completedItems;
    }
    remove() {
        this.items.forEach((item) => {
            item.remove();
        });
        this.placeholderItems.forEach((placeholderItem) => {
            placeholderItem.remove();
        });
        this.placeholderItems = [];
        this.removeURLData();
    }
}
