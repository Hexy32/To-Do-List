import List from './List.js'
import Input from './Input.js'

export const list = new List()
const input = new Input()

input.element.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return
  e.preventDefault()

  list.createItem(input.value, null, input.isStarred)

  input.clear()
})

list.createItem('Hello')
console.log(list)
console.log(input)
