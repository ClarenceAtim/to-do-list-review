const getItems = () => {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items;
};

const addToLocalStorage = (item) => {
  const items = getItems();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
};

const updateItemInLocalStorage = (index, updatedItem) => {
  const todoList = getItems();
  const itemIndex = todoList.findIndex((item) => item.index === index);
  console.log(itemIndex);
  if (itemIndex !== -1) {
    todoList[itemIndex] = updatedItem;
    localStorage.setItem('items', JSON.stringify(todoList));
  }
};

const deleteItemFromLocalStorage = (taskId) => {
  let todoList = getItems();
  const itemIndex = todoList.findIndex((todo) => todo.index === taskId);

  if (itemIndex !== -1) {
    todoList.splice(itemIndex, 1);

    // Update the indices of the remaining items
    todoList = todoList.map((todo, index) => {
      todo.index = index + 1;
      return todo;
    });

    localStorage.setItem('items', JSON.stringify(todoList));
  }
};

const editTodo = (e) => {
  const { value, dataset } = e.target;
  const allTodos = getItems();

  allTodos[+dataset.id - 1].description = value;
  console.log(allTodos);

  localStorage.setItem('items', JSON.stringify(allTodos));
};
const clearCompletedTasks = () => {
  let todoList = getItems();
  todoList = todoList.filter((todo) => !todo.completed);
  todoList.forEach((todo, index) => {
    todo.index = index + 1;
  });
  localStorage.setItem('items', JSON.stringify(todoList));
};

export {
  getItems, addToLocalStorage, updateItemInLocalStorage,
  deleteItemFromLocalStorage, editTodo, clearCompletedTasks,
};