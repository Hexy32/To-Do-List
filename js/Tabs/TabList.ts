import List from '../List/List.js'
import Tab from './Tab.js'

const addTabButton = document.getElementById('add-tab') as HTMLLIElement
const clearButton = document.getElementById('clear-button') as HTMLSpanElement

//Define and export the current working list
export let currentList: List

export default class TabList {
  tabs: Tab[] = []
  #MAX_TABS: number

  constructor(MAX_TABS = 10) {
    addTabButton.parentElement?.addEventListener('click', (e) => {
      if (e.target instanceof Element && e.target.tagName === 'LI') {
        if (e.target.classList.value === 'add-tab grow') {
          this.createTab()!.updateName()
        } else {
          this.selectTab(e.target.id)
        }
      }
    })

    this.#MAX_TABS = MAX_TABS

    this.clearButton()
    this.loadData()
    this.update()
  }

  selectTab(tabId: string) {
    this.deselectTabs()

    this.tabs.forEach((tab) => {
      if (tab.id === tabId) {
        tab.select()

        tab.updateName()

        if (currentList) currentList.remove()
        currentList = tab.savedList
        currentList.updateHTML()
      }
    })
  }

  deselectTabs() {
    this.tabs.forEach((tab) => {
      tab.deselect()
    })
  }

  removeTab(tabId: string) {
    //Return if there is only one tab
    if (this.tabs.length === 1) return

    for (let i = 0; i < this.tabs.length; i++) {
      const tab = this.tabs[i]
      if (tab.id === tabId) {
        this.tabs[i].element.remove()
        this.tabs.splice(i, 1)

        if (!tab.selected) return

        function getIndex() {
          if (i === 0) return 0
          return i - 1
        }

        this.selectTab(this.tabs[getIndex()].id)
      }
    }
  }

  createTab(name?: string, savedList?: List, id?: string) {
    if (this.tabs.length >= this.#MAX_TABS) return
    this.clearSelectedTabs()

    //Create new list, clear old list
    if (currentList) currentList.remove()
    if (!savedList) {
      currentList = new List(false)
      savedList = currentList
    }

    //Create tab object
    const tab = new Tab(name, savedList, id)
    addTabButton.insertAdjacentElement('beforebegin', tab.element)
    this.tabs.push(tab)

    return tab
  }

  clearSelectedTabs() {
    this.tabs.forEach((tab) => {
      tab.deselect()
    })
  }

  currentTab() {
    const currentTab = this.tabs.find((tab) => tab.selected === true)
    if (currentTab) {
      return currentTab
    } else {
      throw new Error('Current tab returned undefined or null')
    }
  }

  // Save and load
  saveData() {
    const tabListData = JSON.stringify(this.tabs)

    localStorage.setItem('TabList', tabListData)
  }

  loadData() {
    const rawData = localStorage.getItem('TabList')
    if (!rawData) return
    const data = JSON.parse(rawData)
    let selectTabId
    data.forEach((tab: Tab) => {
      //Load tabs
      this.createTab(tab.name, undefined, tab.id)

      //Send load request to list
      const listData = tab.savedList.items

      if (listData.length) {
        currentList.loadData(listData)
      }

      if (tab.selected) selectTabId = tab.id
    })

    if (selectTabId) this.selectTab(selectTabId)
  }

  // Update stats
  updateStats() {
    if (currentList) {
      const todoItems = document.getElementById('todo-items') as HTMLSpanElement
      const completedItems = document.getElementById(
        'completed-items'
      ) as HTMLSpanElement
      const totalItems = document.getElementById(
        'total-items'
      ) as HTMLSpanElement

      todoItems.textContent = JSON.stringify(currentList.todoItems)
      completedItems.textContent = JSON.stringify(currentList.completedItems)
      totalItems.textContent = JSON.stringify(currentList.totalItems)

      this.saveData()
    }
  }

  update() {
    this.updateStats()
    setTimeout(() => this.update(), 200)
  }

  //Clear button
  clearButton() {
    clearButton.addEventListener('click', () => {
      currentList.remove()
      currentList = new List(false)
      this.currentTab().savedList = currentList
    })
  }
}
