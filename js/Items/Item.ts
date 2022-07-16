const itemTemplate = document.getElementById('item') as HTMLTemplateElement

export default class Item {
  content: any
  id: string
  isStarred: boolean
  isDone: boolean
  element!: HTMLLIElement
  #emptyCheckboxSVG!: HTMLImageElement
  #checkboxSVG!: HTMLImageElement
  #emptyStarSVG!: HTMLImageElement
  #starSVG!: HTMLImageElement
  #deleteSVG!: HTMLImageElement

  constructor(
    content: string,
    id: string,
    isStarred: boolean,
    isDone: boolean
  ) {
    this.content = content
    this.id = id
    this.isStarred = isStarred
    this.isDone = isDone

    this.createItem()
  }

  createItem() {
    const itemTemplateClone = itemTemplate.cloneNode(
      true
    ) as HTMLTemplateElement
    this.element = itemTemplateClone.content.firstElementChild as HTMLLIElement

    this.#emptyCheckboxSVG = this.element.querySelector(
      '.checkbox-empty'
    ) as HTMLImageElement
    this.#checkboxSVG = this.element.querySelector(
      '.checkbox'
    ) as HTMLImageElement
    this.#emptyStarSVG = this.element.querySelector(
      '.star-empty'
    ) as HTMLImageElement
    this.#starSVG = this.element.querySelector('.star') as HTMLImageElement
    this.#deleteSVG = this.element.querySelector(
      '.deleteSVG'
    ) as HTMLImageElement

    this.element.querySelector('.content')!.textContent = this.content
    this.element.id = this.id

    this.#setStarred()
    this.#setDone()
    this.setupInput()
  }

  #setStarred() {
    if (this.isStarred) {
      this.#emptyStarSVG.style.display = 'none'
      this.#starSVG.style.display = 'block'
      this.element.classList.add('starred')
    } else {
      this.#emptyStarSVG.style.display = 'block'
      this.#starSVG.style.display = 'none'
      this.element.classList.remove('starred')
    }
  }

  #setDone() {
    if (this.isDone) {
      this.#emptyCheckboxSVG.style.display = 'none'
      this.#checkboxSVG.style.display = 'block'
      this.element.classList.add('completed')
    } else {
      this.#emptyCheckboxSVG.style.display = 'block'
      this.#checkboxSVG.style.display = 'none'
      this.element.classList.remove('completed')
    }
  }

  get delete() {
    return this.#deleteSVG
  }

  get checkbox() {
    return this.#checkboxSVG
  }

  get checkboxEmpty() {
    return this.#emptyCheckboxSVG
  }

  get star() {
    return this.#starSVG
  }

  get starEmpty() {
    return this.#emptyStarSVG
  }

  toggleStarred() {
    this.isStarred = !this.isStarred
    this.#setStarred()
  }

  toggleDone() {
    this.isDone = !this.isDone
    this.#setDone()
  }

  remove() {
    this.element.remove()
  }

  setupInput() {
    this.checkbox.addEventListener('click', () => {
      this.toggleDone()
    })

    this.checkboxEmpty.addEventListener('click', () => {
      this.toggleDone()
    })

    this.star.addEventListener('click', () => {
      this.toggleStarred()
    })

    this.starEmpty.addEventListener('click', () => {
      this.toggleStarred()
    })
  }
}
