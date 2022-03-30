import './style.css'

const toDoItems = [
  { description: 'Do the chores', completed: false, index: 0 },
  { description: "Take a nap", completed: false, index: 1 },
  { description: 'Do Microverse Work', completed: false, index: 2 },
]
const listWrap = document.querySelector('.todo-list-wrap')
// IMPLEMENT TO DO ITEMS TO SCREEN
const implementToDoItems = () => {
  toDoItems.forEach((task) => {
    listWrap.innerHTML += `<li class="list-item" data-key="${task.index}">
      <div class="list-item-check-name">
        <button type="button" class="check-item" data-key="${task.index}"></button>
        <input class="description-input" type="text" value="${task.description}">
      </div>
      <button data-key="${task.index}" class="move-item"><i class="fas fa-ellipsis-v"></i></button>
    </li>`
  })
}
implementToDoItems()
