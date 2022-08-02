import List from '../List/List.js';
import Tab from './Tab.js';
const addTabButton = document.getElementById('add-tab');
const listElm = addTabButton.parentElement;
export let currentList = new List();
export default class TabList {
    tabs = [];
    constructor() {
        this.createTab();
        addTabButton.addEventListener('click', () => {
            this.createTab();
        });
    }
    createTab() {
        this.tabs.forEach((tab) => {
            tab.deselect();
        });
        const tab = new Tab(undefined, currentList);
        addTabButton.insertAdjacentElement('beforebegin', tab.element);
        this.tabs.push(tab);
    }
    currentTab() {
        return listElm.querySelector('.selected');
    }
}
