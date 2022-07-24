import List from './List/List.js'
import Input from './Input/Input.js'
import TabList from './Tabs/TabList.js'

const clearButton = document.getElementById('clear-button') as HTMLSpanElement

export let list = new List()
const input = new Input()
const tabList = new TabList()
console.log(tabList)

input.element.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return
  e.preventDefault()

  list.createItem(input.value, undefined, input.isStarred)

  input.clear()
})

update()
function update() {
  updateStats()
  setTimeout(update, 200)
}

clearButton.addEventListener('click', clearList)

function updateStats() {
  const todoItems = document.getElementById('todo-items') as HTMLSpanElement
  const completedItems = document.getElementById(
    'completed-items'
  ) as HTMLSpanElement
  const totalItems = document.getElementById('total-items') as HTMLSpanElement

  todoItems.textContent = JSON.stringify(list.todoItems)
  completedItems.textContent = JSON.stringify(list.completedItems)
  totalItems.textContent = JSON.stringify(list.totalItems)
  list.saveData()
}

function clearList() {
  list = new List(false)
  console.log('List successfully created!', list)
}
