import { itemTemplate, list } from './List.js'

export default class Item {
  constructor(
    content,
    id = JSON.stringify(Date.now()),
    isStarred = false,
    isDone = false
  ) {
    this.content = content
    this.id = id
    this.isStarred = isStarred
    this.isDone = isDone

    this.createItem()
  }

  createItem() {
    this.element = itemTemplate.cloneNode(true).content.firstElementChild

    this.emptyCheckboxSVG = this.element.querySelector('.checkbox-empty')
    this.checkboxSVG = this.element.querySelector('.checkbox')
    this.emptyStarSVG = this.element.querySelector('.star-empty')
    this.starSVG = this.element.querySelector('.star')

    this.element.querySelector('.content').textContent = this.content
    this.element.id = this.id

    this.#setStarred()
    this.#setDone()

    list.prepend(this.element)
  }

  #setStarred() {
    if (this.isStarred) {
      this.emptyStarSVG.style.display = 'none'
      this.starSVG.style.display = 'block'
      this.element.classList.add('starred')
    } else {
      this.emptyStarSVG.style.display = 'block'
      this.starSVG.style.display = 'none'
      this.element.classList.remove('starred')
    }
  }

  #setDone() {
    if (this.isDone) {
      this.emptyCheckboxSVG.style.display = 'none'
      this.checkboxSVG.style.display = 'block'
      this.element.classList.add('completed')
    } else {
      this.emptyCheckboxSVG.style.display = 'block'
      this.checkboxSVG.style.display = 'none'
      this.element.classList.remove('completed')
    }
  }

  toggleStarred() {
    this.isStarred = !this.isStarred
    this.setStarred()
  }

  toggleDone() {
    this.isDone = !this.isDone
    this.setDone()
  }
}
