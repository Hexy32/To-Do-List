import List from '../List/List.js';
import Tab from './Tab.js';
const addTabButton = document.getElementById('add-tab');
export let currentList;
export default class TabList {
    tabs = [];
    constructor() {
        this.createTab();
        addTabButton.addEventListener('click', () => {
            this.createTab();
        });
        addTabButton.parentElement?.addEventListener('click', (e) => {
            console.log(e.target);
        });
        this.loadData();
        this.update();
    }
    createTab() {
        this.clearSelectedTabs();
        if (currentList) {
            currentList.remove();
        }
        currentList = new List(false);
        const tab = new Tab(undefined, currentList);
        addTabButton.insertAdjacentElement('beforebegin', tab.element);
        this.tabs.push(tab);
    }
    clearSelectedTabs() {
        this.tabs.forEach((tab) => {
            tab.deselect();
        });
    }
    currentTab() {
        return this.tabs.find((tab) => tab.selected === true);
    }
    saveData() {
        const tabListData = JSON.stringify(this.tabs);
        localStorage.setItem('TabList', tabListData);
    }
    loadData() {
        const rawData = localStorage.getItem('TabList');
        if (!rawData)
            return;
        const data = JSON.parse(rawData);
        data.forEach((tab) => {
            if (tab.selected === true) {
                const listData = tab.savedList.items;
                if (listData.length) {
                    currentList.loadData(listData);
                }
            }
        });
    }
    updateStats() {
        const todoItems = document.getElementById('todo-items');
        const completedItems = document.getElementById('completed-items');
        const totalItems = document.getElementById('total-items');
        todoItems.textContent = JSON.stringify(currentList.todoItems);
        completedItems.textContent = JSON.stringify(currentList.completedItems);
        totalItems.textContent = JSON.stringify(currentList.totalItems);
        this.saveData();
    }
    update() {
        this.updateStats();
        setTimeout(() => this.update(), 200);
    }
}
