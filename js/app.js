import List from './List.js';
import Input from './Input.js';
export const list = new List();
const input = new Input();
input.element.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter')
        return;
    e.preventDefault();
    list.createItem(input.value, undefined, input.isStarred);
    input.clear();
});
window.addEventListener('click', () => {
    updateStats();
});
window.addEventListener('keydown', () => {
    updateStats();
});
window.addEventListener('DOMContentLoaded', () => {
    list.pullFromLocalStorage();
    updateStats();
    console.log('LOADED!');
});
function updateStats() {
    const todoItems = document.getElementById('todo-items');
    const completedItems = document.getElementById('completed-items');
    const totalItems = document.getElementById('total-items');
    todoItems.textContent = JSON.stringify(list.todoItems);
    completedItems.textContent = JSON.stringify(list.completedItems);
    totalItems.textContent = JSON.stringify(list.totalItems);
    list.pushToLocalStorage();
}
