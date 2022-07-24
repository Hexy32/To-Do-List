import List from '../List/List.js'
import Tab from './Tab.js'

const addTabButton = document.getElementById('add-tab') as HTMLLIElement

export default class TabList {
  tabs: Tab[] = []

  constructor() {
    this.createTab()

    addTabButton.addEventListener('click', () => {
      this.createTab()
    })
  }

  createTab() {
    this.tabs.forEach((tab) => {
      tab.deselect()
    })

    const tab = new Tab()
    console.log(tab)
    addTabButton.insertAdjacentElement('beforebegin', tab.element)

    this.tabs.push(tab)
  }

  currentTab() {
    const tabListElm = addTabButton.parentElement as HTMLUListElement

    return tabListElm.querySelector('.selected')
  }
}
