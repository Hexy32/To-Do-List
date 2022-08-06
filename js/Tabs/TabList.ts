import List from '../List/List.js'
import Tab from './Tab.js'

const addTabButton = document.getElementById('add-tab') as HTMLLIElement

//Define and export the current working list
export let currentList: List

export default class TabList {
  tabs: Tab[] = []

  constructor() {
    this.createTab()

    addTabButton.addEventListener('click', () => {
      this.createTab()
    })
    addTabButton.parentElement?.addEventListener('click', (e) => {
      console.log(e.target)
    })

    this.loadData()
    this.update()
  }

  createTab() {
    this.clearSelectedTabs()

    //Create new list, clear old list
    if (currentList) {
      currentList.remove()
    }
    currentList = new List(false)

    //Create tab object
    const tab = new Tab(undefined, currentList)
    addTabButton.insertAdjacentElement('beforebegin', tab.element)
    this.tabs.push(tab)
  }

  clearSelectedTabs() {
    this.tabs.forEach((tab) => {
      tab.deselect()
    })
  }

  currentTab() {
    return this.tabs.find((tab) => tab.selected === true)
  }

  // Save and load
  saveData() {
    const tabListData = JSON.stringify(this.tabs)

    localStorage.setItem('TabList', tabListData)

    //Set URL to shareable-data
    ////window.location.hash = encodeURI(rawData)
  }

  loadData() {
    const rawData = localStorage.getItem('TabList')
    if (!rawData) return
    const data = JSON.parse(rawData)

    data.forEach((tab: Tab) => {
      if (tab.selected === true) {
        const listData = tab.savedList.items

        if (listData.length) {
          currentList.loadData(listData)
        }
      }
    })
  }

  // Update stats
  updateStats() {
    const todoItems = document.getElementById('todo-items') as HTMLSpanElement
    const completedItems = document.getElementById(
      'completed-items'
    ) as HTMLSpanElement
    const totalItems = document.getElementById('total-items') as HTMLSpanElement

    todoItems.textContent = JSON.stringify(currentList.todoItems)
    completedItems.textContent = JSON.stringify(currentList.completedItems)
    totalItems.textContent = JSON.stringify(currentList.totalItems)

    this.saveData()
  }

  update() {
    this.updateStats()
    setTimeout(() => this.update(), 200)
  }
}
