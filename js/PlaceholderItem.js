import { placeholderItemTemplate, list } from './List.js';
export default class PlaceholderItem {
    element;
    constructor() {
        const placeholderItemTemplateClone = placeholderItemTemplate.cloneNode(true);
        this.element = placeholderItemTemplateClone.content.firstElementChild;
        list.appendChild(this.element);
    }
    remove() {
        this.element.remove();
    }
}
