import PlaceholderItem from './PlaceholderItem.js'
import Item from './Item.js'

export const itemTemplate = document.getElementById(
  'item'
) as HTMLTemplateElement
export const placeholderItemTemplate = document.getElementById(
  'placeholder-item'
) as HTMLTemplateElement
export const list = document.getElementById('list')

export default class List {
  itemsPerPage: number
  placeholderItems: PlaceholderItem[]
  items: Item[]
  constructor(items?: Item[], itemsPerPage = 6) {
    this.itemsPerPage = itemsPerPage

    this.placeholderItems = []
    this.items = []

    if (items != null) {
      this.items = items
      this.addItems(this.items)
    } else {
      this.createBlankItems()
    }
  }

  addItems(items: Item[]) {
    items.forEach((item: Item) => {
      this.removeBlankItem()
      this.createItem(item.content, item.id, item.isStarred, item.isDone)
    })
    if (this.items.length < this.itemsPerPage) {
      this.createBlankItems()
    }
  }

  createItem(
    content: string,
    id?: string,
    isStarred?: boolean,
    isDone?: boolean
  ) {
    this.removeBlankItem()

    const item = new Item(content, id, isStarred, isDone)
    this.setupDelete(item)
    this.items.push(item)
  }

  removeBlankItem() {
    if (
      this.totalItemsLength >= this.itemsPerPage &&
      this.placeholderItems.length > 0
    ) {
      this.placeholderItems.pop().remove()
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

  createBlankItems() {
    const numberOfBlanks =
      this.items == undefined
        ? this.itemsPerPage
        : this.itemsPerPage - this.items.length

    for (let i = 0; i < numberOfBlanks; i++) {
      const placeholderItem = new PlaceholderItem()
      this.placeholderItems.push(placeholderItem)
    }
  }

  createBlankItem() {
    if (this.itemsPerPage < this.totalItemsLength + 1) return
    const placeholderItem = new PlaceholderItem()
    this.placeholderItems.push(placeholderItem)
  }

  get totalItemsLength() {
    const totalItems = [].concat(this.items, this.placeholderItems)
    return totalItems.length
  }
}
