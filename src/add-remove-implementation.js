import { implementToDoItems, setToDoArr } from './index.js';
import checkTask from './task-survey.js';
import descriptionOnFocus from './focus-functionality.js';
const listWrap = document.querySelector('.todo-list-wrap');
const addNewInput = document.querySelector('.add-new-input');
// UPDATE ITEM
export const updateInput = (item) => {
  const newArr = JSON.parse(localStorage.getItem('myToDos'));
  const updateItem = newArr.filter((item2) => item2.index === Number(item.dataset.key))[0];
  const indexOfNewItem = newArr.indexOf(updateItem);
  newArr[indexOfNewItem].description = item.value;
  localStorage.setItem('myToDos', JSON.stringify(newArr));
};
// REMOVE ITEM
export const removeItem = (item, arr, container) => {
  const newArr = JSON.parse(localStorage.getItem('myToDos'));
  const removedItem = newArr.filter((item2) => item2.index === Number(item.dataset.key))[0];
  const removedIndex = newArr.indexOf(removedItem);
  newArr.splice(removedIndex, 1);
  container.innerHTML = '';
  localStorage.setItem('myToDos', JSON.stringify(newArr));
  setToDoArr(newArr);
  implementToDoItems(newArr);
  const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('input', () => updateInput(item)));
  arr = [...document.querySelectorAll('.list-item')];

  const removeBtns = document.querySelectorAll('.remove-item');
  removeBtns.forEach((item) => item.addEventListener('click', () => removeItem(item, arr, container)));
  const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
  toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkTask(item)));
};
// ADD NEW ITEM
export const addNewItem = (event, arr, items, container) => {
  event.preventDefault();
  const description = addNewInput.value;
  const index = arr.length;
  const newItem = document.createElement('li');
  newItem.classList.add('list-item');
  newItem.dataset.key = index;
  newItem.draggable = true;
  newItem.innerHTML = `<div class="list-item-check-name">
                          <input type="checkbox" class="check-item" data-key="${index}">
                          <input class="description-input" type="text" value="${description}">
                        </div>
                        <button type="button" data-key="${index}" class="move-item"><i class="fas fa-ellipsis-v"></i></button>
                        <button type="button" data-key="${index}" class="remove-item"><i class="far fa-trash-alt"></i></button>`;
  container.insertBefore(newItem, container.children[0]);
  const newArr = [];
  items = [...document.querySelectorAll('.list-item')];
  items.forEach((item2, i) => {
    const description = item2.querySelector('.description-input').value;
    let completed = true;
    if (item2.classList.contains('completed-item')) {
      completed = true;
    } else {
      completed = false;
    }
    const index = i + 1;
    newArr.push({ description, completed, index });
  });
  container.innerHTML = '';
  localStorage.setItem('myToDos', JSON.stringify(newArr));
  setToDoArr(newArr);
  implementToDoItems(newArr);
  const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('input', () => updateInput(item)));
  arr = [...document.querySelectorAll('.list-item')];
  const removeBtns = document.querySelectorAll('.remove-item');
  removeBtns.forEach((item) => item.addEventListener('click', () => removeItem(item, arr, container)));
  const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
  toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkTask(item)));
  addNewInput.value = '';
};
// CLEAR ALL
export const clearAll = (container) => {
  let newArr = JSON.parse(localStorage.getItem('myToDos'));
  newArr = newArr.filter((item) => item.completed === false);
  const newSorteredArr = [];
  newArr.forEach((item, i) => {
    const { description, completed } = item;
    const index = i + 1;
    newSorteredArr.push({ description, completed, index });
  });
  container.innerHTML = '';
  localStorage.setItem('myToDos', JSON.stringify(newSorteredArr));
  setToDoArr(newSorteredArr);
  implementToDoItems(newSorteredArr);
  const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));
  toDoDescriptionsInputs.forEach((item) => item.addEventListener('input', () => updateInput(item)));
  const arr = [...document.querySelectorAll('.list-item')];
  const removeBtns = document.querySelectorAll('.remove-item');
  removeBtns.forEach((item) => item.addEventListener('click', () => removeItem(item, arr, container)));
  const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
  toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkTask(item)));
};