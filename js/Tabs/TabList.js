import List from '../List/List.js';
import Tab from './Tab.js';
const addTabButton = document.getElementById('add-tab');
const listElm = addTabButton.parentElement;
export let currentList;
export default class TabList {
    tabs = [];
    constructor() {
        this.createTab();
        addTabButton.addEventListener('click', () => {
            this.createTab();
        });
    }
    createTab() {
        this.clearSelectedTabs();
        const tab = new Tab(undefined, currentList);
        addTabButton.insertAdjacentElement('beforebegin', tab.element);
        if (currentList) {
            currentList.saveData();
            currentList.remove();
        }
        currentList = new List(false, tab.id);
        this.tabs.push(tab);
    }
    clearSelectedTabs() {
        this.tabs.forEach((tab) => {
            tab.deselect();
        });
    }
    currentTab() {
        return listElm.querySelector('.selected');
    }
}
