const tabTemplate = document.getElementById('tab');
export default class Tab {
    element;
    name;
    id;
    #close;
    #edit;
    #input;
    savedList;
    constructor(name = 'Unnamed', list, id = `ID${Date.now()}`) {
        this.name = name;
        this.savedList = list;
        this.id = id;
        this.createTab(name);
    }
    createTab(name) {
        const tabTemplateClone = tabTemplate.cloneNode(true);
        this.element = tabTemplateClone.content.firstElementChild;
        this.#edit = this.element.querySelector('#edit');
        this.#close = this.element.querySelector('#close');
        this.#input = this.element.querySelector('#tab-input');
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
        this.#input.addEventListener('keydown', (e) => {
            if (e.key == 'Enter') {
                this.#input.blur();
            }
        });
    }
    select() {
        this.element.classList.add('selected');
    }
    deselect() {
        this.element.classList.remove('selected');
    }
    remove() {
        this.element.remove();
    }
}
