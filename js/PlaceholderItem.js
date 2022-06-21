import { placeholderItemTemplate, list } from './List.js'

export default class PlaceholderItem {
  constructor() {
    this.element =
      placeholderItemTemplate.cloneNode(true).content.firstElementChild

    list.appendChild(this.element)
  }

  remove() {
    this.element.remove()
  }
}
