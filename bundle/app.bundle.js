/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./build/app/Input.js":
/*!****************************!*\
  !*** ./build/app/Input.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _TabList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TabList.js */ "./build/app/TabList.js");
const input = document.getElementById('input');
const emptyStarSVG = document.querySelectorAll('.input-star')[0];
const starSVG = document.querySelectorAll('.input-star')[1];
const HTMLlist = document.getElementById('list');

class Input {
    element;
    isStarred;
    constructor() {
        this.element = input;
        this.isStarred = false;
        this.setupListeners();
    }
    get value() {
        return this.element.value;
    }
    clear() {
        this.element.value = '';
        this.unStar();
    }
    star() {
        emptyStarSVG.style.display = 'none';
        starSVG.style.display = 'block';
        this.isStarred = true;
    }
    unStar() {
        starSVG.style.display = 'none';
        emptyStarSVG.style.display = 'block';
        this.isStarred = false;
    }
    setupListeners() {
        emptyStarSVG.addEventListener('click', () => {
            this.star();
        });
        starSVG.addEventListener('click', () => {
            this.unStar();
        });
        this.element.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter')
                return;
            e.preventDefault();
            _TabList_js__WEBPACK_IMPORTED_MODULE_0__.currentList.createItem(this.value, undefined, this.isStarred);
            HTMLlist.scrollTop = HTMLlist.scrollHeight;
            this.clear();
        });
    }
}


/***/ }),

/***/ "./build/app/Item.js":
/*!***************************!*\
  !*** ./build/app/Item.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Item)
/* harmony export */ });
const itemTemplate = document.getElementById('item');
class Item {
    content;
    id;
    isStarred;
    isDone;
    element;
    #emptyCheckboxSVG;
    #checkboxSVG;
    #emptyStarSVG;
    #starSVG;
    #deleteSVG;
    constructor(content, id, isStarred, isDone) {
        this.content = content;
        this.id = id;
        this.isStarred = isStarred;
        this.isDone = isDone;
        this.createItem();
    }
    createItem() {
        const itemTemplateClone = itemTemplate.cloneNode(true);
        this.element = itemTemplateClone.content.firstElementChild;
        this.#emptyCheckboxSVG = this.element.querySelector('.checkbox-empty');
        this.#checkboxSVG = this.element.querySelector('.checkbox');
        this.#emptyStarSVG = this.element.querySelector('.star-empty');
        this.#starSVG = this.element.querySelector('.star');
        this.#deleteSVG = this.element.querySelector('.deleteSVG');
        this.element.querySelector('.content').textContent = this.content;
        this.element.id = this.id;
        this.#setStarred();
        this.#setDone();
        this.setupInput();
    }
    #setStarred() {
        if (this.isStarred) {
            this.#emptyStarSVG.style.display = 'none';
            this.#starSVG.style.display = 'block';
            this.element.classList.add('starred');
        }
        else {
            this.#emptyStarSVG.style.display = 'block';
            this.#starSVG.style.display = 'none';
            this.element.classList.remove('starred');
        }
    }
    #setDone() {
        if (this.isDone) {
            this.#emptyCheckboxSVG.style.display = 'none';
            this.#checkboxSVG.style.display = 'block';
            this.element.classList.add('completed');
        }
        else {
            this.#emptyCheckboxSVG.style.display = 'block';
            this.#checkboxSVG.style.display = 'none';
            this.element.classList.remove('completed');
        }
    }
    get delete() {
        return this.#deleteSVG;
    }
    get checkbox() {
        return this.#checkboxSVG;
    }
    get checkboxEmpty() {
        return this.#emptyCheckboxSVG;
    }
    get star() {
        return this.#starSVG;
    }
    get starEmpty() {
        return this.#emptyStarSVG;
    }
    toggleStarred() {
        this.isStarred = !this.isStarred;
        this.#setStarred();
    }
    toggleDone() {
        this.isDone = !this.isDone;
        this.#setDone();
    }
    remove() {
        this.element.remove();
    }
    setupInput() {
        this.checkbox.addEventListener('click', () => {
            this.toggleDone();
        });
        this.checkboxEmpty.addEventListener('click', () => {
            this.toggleDone();
        });
        this.star.addEventListener('click', () => {
            this.toggleStarred();
        });
        this.starEmpty.addEventListener('click', () => {
            this.toggleStarred();
        });
    }
}


/***/ }),

/***/ "./build/app/List.js":
/*!***************************!*\
  !*** ./build/app/List.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ List)
/* harmony export */ });
/* harmony import */ var _PlaceholderItem_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlaceholderItem.js */ "./build/app/PlaceholderItem.js");
/* harmony import */ var _Item_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item.js */ "./build/app/Item.js");


const HTMLlist = document.getElementById('list');
class List {
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
            this.createItem(item.content, item.id, item.isStarred, item.isDone);
        });
    }
    createItem(content, id, isStarred = false, isDone = false) {
        if (content.trim() == '')
            return;
        if (id == null) {
            id = `ID${Date.now()}`;
        }
        this.removeBlankItem();
        const item = new _Item_js__WEBPACK_IMPORTED_MODULE_1__["default"](content, id, isStarred, isDone);
        this.appendItem(item);
        this.setupInput(item);
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
            const placeholderItem = new _PlaceholderItem_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
            HTMLlist.append(placeholderItem.element);
            this.placeholderItems.push(placeholderItem);
        }
    }
    createBlankItem() {
        if (this.itemsPerPage < this.totalItemsLength + 1)
            return;
        const placeholderItem = new _PlaceholderItem_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
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


/***/ }),

/***/ "./build/app/PlaceholderItem.js":
/*!**************************************!*\
  !*** ./build/app/PlaceholderItem.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlaceholderItem)
/* harmony export */ });
const placeholderItemTemplate = document.getElementById('placeholder-item');
class PlaceholderItem {
    element;
    constructor() {
        const placeholderItemTemplateClone = placeholderItemTemplate.cloneNode(true);
        this.element = placeholderItemTemplateClone.content.firstElementChild;
    }
    remove() {
        this.element.remove();
    }
}


/***/ }),

/***/ "./build/app/Tab.js":
/*!**************************!*\
  !*** ./build/app/Tab.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tab)
/* harmony export */ });
/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.js */ "./build/app/app.js");

const tabTemplate = document.getElementById('tab');
const tabTitle = document.querySelector('header')
    ?.children[0];
class Tab {
    element;
    name;
    id;
    selected;
    #close;
    #edit;
    #input;
    savedList;
    completed;
    constructor(name = 'Unnamed', list, id = `ID${Date.now()}`, completed = false) {
        this.selected = true;
        this.createTab(name, list, id, completed);
    }
    createTab(name, list, id, completed) {
        const tabTemplateClone = tabTemplate.cloneNode(true);
        this.element = tabTemplateClone.content.firstElementChild;
        this.#edit = this.element.querySelector('#edit');
        this.#close = this.element.querySelector('#close');
        this.#input = this.element.querySelector('#tab-input');
        this.element.id = id;
        this.id = id;
        this.savedList = list;
        this.name = name;
        this.completed = completed;
        if (completed) {
            this.complete();
        }
        this.element.classList.add('grow');
        this.select();
        this.#input.value = name;
        this.setupInput();
    }
    setupInput() {
        this.#edit.addEventListener('click', () => {
            this.#input.focus();
        });
        this.#close.addEventListener('click', () => {
            this.remove();
        });
        this.#input.addEventListener('keyup', (e) => {
            this.name = this.#input.value;
            this.updateName(false);
            if (e.key == 'Enter') {
                this.#input.blur();
            }
        });
    }
    select() {
        this.element.classList.add('selected');
        this.selected = true;
    }
    deselect() {
        this.element.classList.remove('selected');
        this.selected = false;
    }
    complete() {
        this.element.classList.add('tab-completed');
        this.completed = true;
    }
    unComplete() {
        this.element.classList.remove('tab-completed');
        this.completed = false;
    }
    remove() {
        _app_js__WEBPACK_IMPORTED_MODULE_0__.tabList.removeTab(this.id);
    }
    updateName(updateTab = false) {
        if (updateTab) {
            this.name = tabTitle.value;
            this.#input.value = this.name;
        }
        else {
            this.name = this.#input.value;
            if (this.selected) {
                tabTitle.value = this.name;
            }
        }
    }
}


/***/ }),

/***/ "./build/app/TabList.js":
/*!******************************!*\
  !*** ./build/app/TabList.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentList": () => (/* binding */ currentList),
/* harmony export */   "default": () => (/* binding */ TabList)
/* harmony export */ });
/* harmony import */ var _List_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.js */ "./build/app/List.js");
/* harmony import */ var _Tab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tab.js */ "./build/app/Tab.js");


const addTabButton = document.getElementById('add-tab');
const clearButton = document.getElementById('clear-button');
const tabTitle = document.querySelector('header')
    ?.children[0];
let currentList;
class TabList {
    tabs = [];
    #MAX_TABS;
    constructor(MAX_TABS = 10) {
        addTabButton.parentNode?.addEventListener('click', (e) => {
            if (e.target instanceof Element && e.target.tagName === 'LI') {
                if (e.target.id === 'add-tab') {
                    this.createTab();
                }
                else {
                    this.selectTab(e.target.id);
                }
            }
        });
        this.#MAX_TABS = MAX_TABS;
        this.clearButton();
        this.tabTitle();
        this.loadData();
        this.update();
        window.addEventListener('click', () => {
            this.update();
        });
        window.addEventListener('keydown', () => {
            this.update();
        });
    }
    selectTab(tabId) {
        if (this.currentTab().id === tabId)
            return;
        this.tabs.forEach((tab) => {
            if (tab.id === tabId) {
                this.deselectTabs();
                tab.select();
                tab.updateName();
                if (currentList)
                    currentList.remove();
                currentList = tab.savedList;
                currentList.updateHTML();
            }
        });
    }
    deselectTabs() {
        this.tabs.forEach((tab) => {
            tab.deselect();
        });
    }
    completeTab() {
        this.currentTab().complete();
    }
    unCompleteTab() {
        this.currentTab().unComplete();
    }
    removeTab(tabId) {
        if (this.tabs.length === 1)
            return;
        for (let i = 0; i < this.tabs.length; i++) {
            const tab = this.tabs[i];
            if (tab.id === tabId) {
                tab.element.classList.add('closing');
                tab.element.addEventListener('animationend', () => {
                    if (tab.selected) {
                        function getIndex() {
                            if (i === 0)
                                return i + 1;
                            return i - 1;
                        }
                        this.selectTab(this.tabs[getIndex()].id);
                    }
                    this.tabs[i].element.remove();
                    this.tabs.splice(i, 1);
                }, { once: true });
            }
        }
    }
    createTab(name, savedList, id, completed) {
        if (this.tabs.length >= this.#MAX_TABS)
            return;
        this.clearSelectedTabs();
        if (currentList)
            currentList.remove();
        if (!savedList) {
            currentList = new _List_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
            savedList = currentList;
        }
        const tab = new _Tab_js__WEBPACK_IMPORTED_MODULE_1__["default"](name, savedList, id, completed);
        addTabButton.insertAdjacentElement('beforebegin', tab.element);
        this.tabs.push(tab);
        tab.updateName();
    }
    clearSelectedTabs() {
        this.tabs.forEach((tab) => {
            tab.deselect();
        });
    }
    currentTab() {
        const currentTab = this.tabs.find((tab) => tab.selected === true);
        if (currentTab) {
            return currentTab;
        }
        else {
            throw new Error('Current tab returned undefined or null');
        }
    }
    saveData() {
        const tabListData = JSON.stringify(this.tabs);
        localStorage.setItem('TabList', tabListData);
    }
    loadData() {
        const rawData = localStorage.getItem('TabList');
        if (!rawData) {
            this.createTab();
            return;
        }
        const data = JSON.parse(rawData);
        let selectTabId;
        data.forEach((tab) => {
            this.createTab(tab.name, undefined, tab.id, tab.completed);
            const listData = tab.savedList.items;
            if (listData.length) {
                currentList.loadData(listData);
            }
            if (tab.selected)
                selectTabId = tab.id;
        });
        if (selectTabId)
            this.selectTab(selectTabId);
    }
    update() {
        if (currentList.items.every((item) => item.isDone === true) &&
            currentList.items.length >= 1) {
            this.completeTab();
        }
        else {
            this.unCompleteTab();
        }
        if (currentList) {
            const todoItems = document.getElementById('todo-items');
            const completedItems = document.getElementById('completed-items');
            const totalItems = document.getElementById('total-items');
            todoItems.textContent = JSON.stringify(currentList.todoItems);
            completedItems.textContent = JSON.stringify(currentList.completedItems);
            totalItems.textContent = JSON.stringify(currentList.totalItems);
            this.saveData();
        }
    }
    clearButton() {
        clearButton.addEventListener('click', () => {
            currentList.remove();
            currentList = new _List_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
            this.currentTab().savedList = currentList;
        });
    }
    tabTitle() {
        tabTitle.addEventListener('keyup', (e) => {
            this.currentTab().updateName(true);
            if (e.key == 'Enter') {
                tabTitle.blur();
            }
        });
    }
}


/***/ }),

/***/ "./build/app/app.js":
/*!**************************!*\
  !*** ./build/app/app.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tabList": () => (/* binding */ tabList)
/* harmony export */ });
/* harmony import */ var _Input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input.js */ "./build/app/Input.js");
/* harmony import */ var _TabList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabList.js */ "./build/app/TabList.js");


const tabList = new _TabList_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
new _Input_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
console.log(tabList);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build/app/app.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map