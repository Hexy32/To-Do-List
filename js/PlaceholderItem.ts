const placeholderItemTemplate = document.getElementById(
  'placeholder-item'
) as HTMLTemplateElement

export default class PlaceholderItem {
  element: any
  constructor() {
    const placeholderItemTemplateClone = placeholderItemTemplate.cloneNode(
      true
    ) as HTMLTemplateElement
    this.element = placeholderItemTemplateClone.content.firstElementChild
  }

  remove() {
    this.element.remove()
  }
}
