import List from './List.js';
import Tab from './Tab.js';
export declare let currentList: List;
export default class TabList {
    #private;
    tabs: Tab[];
    constructor(MAX_TABS?: number);
    selectTab(tabId: string): void;
    deselectTabs(): void;
    completeTab(): void;
    unCompleteTab(): void;
    removeTab(tabId: string): void;
    createTab(name?: string, savedList?: List, id?: string, completed?: boolean): void;
    clearSelectedTabs(): void;
    currentTab(): Tab;
    saveData(): void;
    loadData(): void;
    update(): void;
    clearButton(): void;
    tabTitle(): void;
}
