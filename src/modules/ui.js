import {
  updateItemInLocalStorage, deleteItemFromLocalStorage, editTodo, getItems,
} from './utility.js';

class UI {
  dispayItems(items) {
    this.items = items;
    const tasks = document.querySelector('.tasks');
    const list = document.createElement('li');
    list.className = 'list';
    list.id = items.index;
    list.innerHTML = `
      <div class="list-item">
        <input type="checkbox" class="list__item--checkbox">
        <input data-id=${items.index} type="text" class="edit" value="${items.description}">
      </div>
      <button id="${items.index}" class="list__item--delete"><i class="fa fa-trash-alt"></i></button>
    `;
    tasks.appendChild(list);

    const checkbox = list.querySelector('.list__item--checkbox');
    const edit = list.querySelector('.edit');
    const deleteBtn = list.querySelector('.list__item--delete');

    edit.addEventListener('blur', editTodo);

    checkbox.addEventListener('change', () => {
      items.completed = !items.completed;

      if (items.completed === true) {
        edit.style.textDecoration = 'line-through';
      } else {
        edit.style.textDecoration = 'none';
      }

      updateItemInLocalStorage(items.index, items);
    });

    checkbox.checked = items.completed;

    if (items.completed === true) {
      edit.style.textDecoration = 'line-through';
    } else {
      edit.style.textDecoration = 'none';
    }

    deleteBtn.addEventListener('click', () => {
      list.remove();
      deleteItemFromLocalStorage(items.index);
    });
  }

  refreshItems() {
    const tasks = document.querySelector('.tasks');
    tasks.innerHTML = '';
    const items = getItems();
    items.forEach((item) => {
      this.dispayItems(item);
    });
  }
}

export default UI;