const input = document.getElementById('input') as HTMLInputElement
//Get the star in the input section
const emptyStarSVG = document.querySelectorAll(
  '.input-star'
)[0] as HTMLImageElement
const starSVG = document.querySelectorAll('.input-star')[1] as HTMLImageElement

//Get the current list
import { currentList as list } from '../Tabs/TabList.js'

export default class Input {
  element: HTMLInputElement
  isStarred: boolean

  constructor() {
    this.element = input
    this.isStarred = false

    this.setupListeners()
  }

  get value() {
    return this.element.value
  }

  clear() {
    this.element.value = ''
    this.unStar()
  }

  star() {
    emptyStarSVG.style.display = 'none'
    starSVG.style.display = 'block'
    this.isStarred = true
  }

  unStar() {
    starSVG.style.display = 'none'
    emptyStarSVG.style.display = 'block'
    this.isStarred = false
  }

  setupListeners() {
    //Add a event listener to check for the star being clicked
    emptyStarSVG.addEventListener('click', () => {
      this.star()
    })
    starSVG.addEventListener('click', () => {
      this.unStar()
    })

    //Check for main input
    this.element.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return
      e.preventDefault()

      //Main item creation
      list.createItem(this.value, undefined, this.isStarred)
      this.clear()
    })
  }
}
