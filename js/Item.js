import { itemTemplate, list } from './List.js';
export default class Item {
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
    constructor(content, id = JSON.stringify(Date.now()), isStarred = false, isDone = false) {
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
        list.prepend(this.element);
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
