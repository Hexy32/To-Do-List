import PlaceholderItem from './PlaceholderItem.js'
import Item from './Item.js'

const HTMLlist = document.getElementById('list')

export default class List {
  itemsPerPage: number
  placeholderItems: PlaceholderItem[]
  items: Item[]
  constructor(itemsPerPage = 6) {
    this.itemsPerPage = itemsPerPage
    document.documentElement.style.setProperty(
      '--total-items',
      itemsPerPage.toString()
    )

    this.placeholderItems = []
    this.items = []

    this.createBlankItems()
  }

  createItems(items: Item[]) {
    items.forEach((item: Item) => {
      this.removeBlankItem()
      this.createItem(item.content, item.id, item.isStarred, item.isDone)
    })
  }

  createItem(
    content: string,
    id?: string,
    isStarred: boolean = false,
    isDone: boolean = false
  ) {
    if (id == null) {
      id = `ID${Date.now()}`
    }

    this.removeBlankItem()

    const item = new Item(content, id, isStarred, isDone)

    this.appendItem(item)

    this.setupDelete(item)

    this.setupStar(item)
  }

  private appendItem(item: Item) {
    if (this.items.length == 0 || item.isStarred) {
      HTMLlist!.prepend(item.element)
      this.items.unshift(item)
      return
    }

    const lastItemElement = this.items[this.items.length - 1].element

    lastItemElement.insertAdjacentElement('afterend', item.element)
    this.items.push(item)
  }

  removeBlankItem() {
    if (
      this.totalItemsLength >= this.itemsPerPage &&
      this.placeholderItems.length > 0
    ) {
      this.placeholderItems.pop()!.remove()
    }
  }

  deleteItem(item: Item) {
    item.remove()
    const index = this.items.findIndex((i) => {
      return i.id === item.id
    })

    this.items.splice(index, 1)
    this.createBlankItem()
  }

  setupDelete(item: Item) {
    item.delete.addEventListener('click', () => {
      this.deleteItem(item)
    })
  }

  setupStar(item: Item) {
    item.starEmpty.addEventListener('click', () => {
      this.starItem(item)
    })
    item.star.addEventListener('click', () => {
      this.unStarItem(item)
    })
  }

  starItem(item: Item) {
    this.createItem(item.content, undefined, item.isStarred, item.isDone)

    this.deleteItem(item)
  }

  unStarItem(item: Item) {
    this.deleteItem(item)

    this.createItem(item.content, undefined, item.isStarred, item.isDone)
  }

  createBlankItems() {
    const numberOfBlanks =
      this.items == undefined
        ? this.itemsPerPage
        : this.itemsPerPage - this.items.length

    for (let i = 0; i < numberOfBlanks; i++) {
      const placeholderItem = new PlaceholderItem()
      HTMLlist!.append(placeholderItem.element)
      this.placeholderItems.push(placeholderItem)
    }
  }

  createBlankItem() {
    if (this.itemsPerPage < this.totalItemsLength + 1) return
    const placeholderItem = new PlaceholderItem()
    HTMLlist!.append(placeholderItem.element)
    this.placeholderItems.push(placeholderItem)
  }

  pushToLocalStorage() {
    const rawData = JSON.stringify(this.items)
    localStorage.setItem('listData', rawData)
    window.location.hash = rawData!.toString()
  }

  pullFromLocalStorage() {
    let data: Item[]
    const rawData = localStorage.getItem('listData')
    const listElem = document.getElementById('list') as HTMLUListElement
    const URLRawData = decodeURI(window.location.hash)

    if (URLRawData!.slice(1)) {
      data = JSON.parse(URLRawData!.slice(1))
      console.log('Loaded from URL')
    } else {
      data = JSON.parse(rawData!)
      console.log('Loaded from LocalStorage')
    }

    if (data.length != 0) {
      data.forEach((item) => {
        item.element = listElem.querySelector(`#${item.id}`) as HTMLLIElement
      })

      window.location.hash = rawData!.toString()
      this.createItems(data)

      console.log(`Loaded rawData:`, rawData, `parsed as`, data)
    }
  }

  get totalItemsLength() {
    return this.items.length + this.placeholderItems.length
  }

  get totalItems() {
    return this.items.length
  }

  get completedItems() {
    let x = 0
    this.items.forEach((item) => {
      if (item.isDone !== true) return
      x++
    })

    return x
  }

  get todoItems() {
    return this.totalItems - this.completedItems
  }
}
