import List from '../List/List'

const tabTemplate = document.getElementById('tab') as HTMLTemplateElement

export default class Tab {
  element!: HTMLLIElement
  name: string
  #close!: HTMLImageElement
  #edit!: HTMLImageElement
  #input!: HTMLInputElement
  savedList: List
  constructor(name = 'Unnamed', list: List) {
    this.name = name
    this.savedList = list

    this.createTab(name)
  }

  createTab(name: string) {
    const tabTemplateClone = tabTemplate.cloneNode(true) as HTMLTemplateElement
    this.element = tabTemplateClone.content.firstElementChild as HTMLLIElement

    this.#edit = this.element.querySelector('#edit') as HTMLImageElement
    this.#close = this.element.querySelector('#close') as HTMLImageElement
    this.#input = this.element.querySelector('#tab-input') as HTMLInputElement

    this.element.classList.add('grow')

    this.select()
    this.#input.value = name
    this.setupInput()
  }

  setupInput() {
    this.#edit.addEventListener('click', () => {
      this.#input.focus()
    })
    this.#close.addEventListener('click', () => {
      this.remove()
    })
    this.#input.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        this.#input.blur()
      }
    })
  }

  select() {
    this.element.classList.add('selected')
  }

  deselect() {
    this.element.classList.remove('selected')
  }

  remove() {
    this.element.remove()
  }
}
