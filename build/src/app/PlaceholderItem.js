const placeholderItemTemplate = document.getElementById('placeholder-item');
export default class PlaceholderItem {
    element;
    constructor() {
        const placeholderItemTemplateClone = placeholderItemTemplate.cloneNode(true);
        this.element = placeholderItemTemplateClone.content.firstElementChild;
    }
    remove() {
        this.element.remove();
    }
}
