import { tabList } from './app.js'
import List from './List'

const tabTemplate = document.getElementById('tab') as HTMLTemplateElement
const tabTitle = document.querySelector('header')
  ?.children[0] as HTMLInputElement

export default class Tab {
  element!: HTMLLIElement
  name!: string
  id!: string
  selected: boolean
  #close!: HTMLImageElement
  #edit!: HTMLImageElement
  #input!: HTMLInputElement
  savedList!: List
  completed!: boolean

  constructor(
    name = 'Unnamed',
    list: List,
    id = `ID${Date.now()}`,
    completed = false
  ) {
    this.selected = true

    this.createTab(name, list, id, completed)
  }

  createTab(name: string, list: List, id: string, completed: boolean) {
    const tabTemplateClone = tabTemplate.cloneNode(true) as HTMLTemplateElement
    this.element = tabTemplateClone.content.firstElementChild as HTMLLIElement

    this.#edit = this.element.querySelector('#edit') as HTMLImageElement
    this.#close = this.element.querySelector('#close') as HTMLImageElement
    this.#input = this.element.querySelector('#tab-input') as HTMLInputElement

    this.element.id = id
    this.id = id
    this.savedList = list
    this.name = name
    this.completed = completed

    if (completed) {
      this.complete()
    }

    //Makes tab animate and fill width of container
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
    this.#input.addEventListener('keyup', (e) => {
      this.name = this.#input.value
      this.updateName(false)
      if (e.key == 'Enter') {
        this.#input.blur()
      }
    })
  }

  select() {
    this.element.classList.add('selected')
    this.selected = true
  }

  deselect() {
    this.element.classList.remove('selected')
    this.selected = false
  }

  complete() {
    this.element.classList.add('tab-completed')
    this.completed = true
  }

  unComplete() {
    this.element.classList.remove('tab-completed')
    this.completed = false
  }

  remove() {
    tabList.removeTab(this.id)
  }

  updateName(updateTab = false) {
    if (updateTab) {
      this.name = tabTitle.value
      this.#input.value = this.name
    } else {
      this.name = this.#input.value
      if (this.selected) {
        tabTitle.value = this.name
      }
    }
  }
}
