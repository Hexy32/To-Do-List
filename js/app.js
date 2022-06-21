import List from './List.js';
import Input from './Input.js';
const list = new List();
console.log(list);
const input = new Input();
input.element.addEventListener('keydown', handleInput);
function handleInput(e) {
    if (e.key !== 'Enter')
        return;
    e.preventDefault();
    list.createItem(input.value);
    input.value = '';
}
