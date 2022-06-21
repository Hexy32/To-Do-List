import { placeholderItemTemplate, list } from './List.js'

export default class PlaceholderItem {
  element: any
  constructor() {
    const placeholderItemTemplateClone = placeholderItemTemplate.cloneNode(
      true
    ) as HTMLTemplateElement
    this.element = placeholderItemTemplateClone.content.firstElementChild

    list.appendChild(this.element)
  }

  remove() {
    this.element.remove()
  }
}
