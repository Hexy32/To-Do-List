import Tab from './Tab.js';
const addTabButton = document.getElementById('add-tab');
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
        const tab = new Tab();
        console.log(tab);
        addTabButton.insertAdjacentElement('beforebegin', tab.element);
        this.tabs.push(tab);
    }
    currentTab() {
        const tabListElm = addTabButton.parentElement;
        return tabListElm.querySelector('.selected');
    }
}
