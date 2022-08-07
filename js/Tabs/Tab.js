import { tabList } from '../app.js';
const tabTemplate = document.getElementById('tab');
const tabTitle = document.querySelector('header')
    ?.children[0];
export default class Tab {
    element;
    name;
    id;
    selected;
    #close;
    #edit;
    #input;
    savedList;
    constructor(name = 'Unnamed', list, id = `ID${Date.now()}`) {
        this.selected = true;
        this.createTab(name, list, id);
    }
    createTab(name, list, id) {
        const tabTemplateClone = tabTemplate.cloneNode(true);
        this.element = tabTemplateClone.content.firstElementChild;
        this.#edit = this.element.querySelector('#edit');
        this.#close = this.element.querySelector('#close');
        this.#input = this.element.querySelector('#tab-input');
        this.element.id = id;
        this.id = id;
        this.savedList = list;
        this.name = name;
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
            this.updateName();
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
    remove() {
        tabList.removeTab(this.id);
    }
    updateName() {
        tabTitle.addEventListener('keyup', (e) => {
            this.name = tabTitle.value;
            this.#input.value = tabTitle.value;
            if (e.key == 'Enter') {
                tabTitle.blur();
            }
        });
        tabTitle.value = this.name;
    }
}
