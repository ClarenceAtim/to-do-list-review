import './style.css';
import Data from './modules/data.js';
import { getItems, addToLocalStorage, clearCompletedTasks } from './modules/utility.js';
import UI from './modules/ui.js';

const form = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
  const items = getItems();
  const ui = new UI();
  items.forEach((item) => {
    ui.dispayItems(item);
  });
});

form.addEventListener('submit', (e) => {
  const newId = getItems();
  let index;
  if (newId.length > 0) {
    index = newId[newId.length - 1].index + 1;
  } else {
    index = 1;
  }
  const input = document.querySelector('input').value;
  const completed = false;

  if (input === '') {
    console.log('Please enter a task');
  } else {
    const data = new Data(index, input, completed);
    const ui = new UI();
    ui.dispayItems(data);

    addToLocalStorage(data);

    document.querySelector('input').value = '';
  }

  e.preventDefault();
});

const clearButton = document.querySelector('.btn-clear');
clearButton.addEventListener('click', () => {
  clearCompletedTasks();
  // Refresh the UI to reflect the changes
  const ui = new UI();
  ui.refreshItems();
});