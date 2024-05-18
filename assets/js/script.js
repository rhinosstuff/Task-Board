const taskTitle = document.querySelector('#task-title');
const taskDueDate = document.querySelector('#task-due-date');
const taskDescription = document.querySelector('#task-description');
const taskSubmit = document.querySelector('#task-submit');
const todoCards = document.querySelector('#todo-cards');
const inProgressCards = document.querySelector('#in-progress-cards');
const doneCards = document.querySelector('#done-cards');
const taskDelete = document.querySelectorAll('.drop-columns');

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// creates a unique id by taking nextId++ then setting in localStorage
function generateTaskId() {
  nextId ++;
  localStorage.setItem('nextId', nextId);
}

// check task if true then increment through task adding a task-card for each task object
function createTaskCard(task) {
  
  if (task !== null) {
    for (let i = 0; i < task.length; i++) {
      const addCard = task[i];
  
      const taskCard = document.createElement('div');
      taskCard.id = addCard.id;
      taskCard.className = 'task-card card bg-light mb-3" style="max-width: 18rem;';
      
      // check key: parentId to know which column to append task-card
      if (addCard.parentId === 'in-progress-cards') {
        inProgressCards.appendChild(taskCard);
      } else if (addCard.parentId === 'done-cards') {
        doneCards.appendChild(taskCard);
      } else {
        todoCards.appendChild(taskCard);
      } 
      
      const taskTitle = document.createElement('h5');
      taskTitle.className = 'card-header';
      taskTitle.textContent = addCard.taskTitle;
      taskCard.appendChild(taskTitle);

      const taskBody = document.createElement('div');
      taskBody.className = 'card-body';
      taskCard.appendChild(taskBody);

      const taskText = document.createElement('p');
      taskText.className = 'card-text';
      taskText.textContent = addCard.taskDescription;
      taskBody.appendChild(taskText);

      const taskDate = document.createElement('div');
      taskDate.className = 'card-text pb-2';
      taskDate.textContent = addCard.taskDueDate;
      taskBody.appendChild(taskDate);

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'btn btn-danger border delete-button';
      deleteButton.textContent = 'Delete'
      taskBody.appendChild(deleteButton);

      // compare todays date with task dueDate to change class CSS of task-card
      // if 'today' is 'dueDate', change to yellow warning CSS
      // if 'today' is past 'dueDate', change to red danger CSS 
      const today = dayjs().format('MM/DD/YYYY');
      const dueDate = taskDate.textContent
      
      if (today === dueDate) {
        taskCard.className = 'task-card card text-white bg-warning mb-3" style="max-width: 18rem;';
      } else if (today > dueDate) {
        taskCard.className = 'task-card card text-white bg-danger mb-3" style="max-width: 18rem;';
      }
    }
  }
}

// used to render any previous localStorage tasks
function renderTaskList() {
  if (taskList !== null) {
    createTaskCard(taskList);
  }
}

// gets user input to create new task object
function handleAddTask(event){
  event.preventDefault()
  
  generateTaskId(); // call to generate new unique id
  let addNewCard = [];
  const newTask = {
    parentId: 'todo-cards', // task-card initial-location
    id: nextId,
    taskTitle: taskTitle.value.trim(),
    taskDescription: taskDescription.value.trim(),
    taskDueDate: taskDueDate.value 
  }
  
  // this makes sure we don't push to a null object
  let task = [];
  if (taskList !== null) {
    task = taskList;
  }

  // stores 'newTask' in localStorage 
  task.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(task));
  
  // resets the user-input fields
  taskTitle.value = '';
  taskDescription.value = '';
  taskDueDate.value = '';
  
  // put 'newTask' in 'addNewCard' array so createTaskCard() can process it
  addNewCard.push(newTask);
  createTaskCard(addNewCard);

  // this refreshes the page so localStorage is always updated
  location.replace(location.href);
}

// deletes current task-card
function handleDeleteTask(event){
  // gets the '.delete-button' parent parent we want to remove
  let currentTask = event.target.parentElement.parentElement;
  // gets the 'id' from 'currentTask', converts it to a number to use as a key: into 'taskList'
  const taskId = Number(currentTask.getAttribute('id'));

  // checks to make sure there is data in the 'taskList'
  // then filters out the object by the key: 'id', stores results in 'newList'
  let newList = [];
  if (taskList !== null) {
    newList = taskList.filter(item => item.id !== taskId)
  }
  
  // sets 'newList' localStorage
  localStorage.setItem('tasks', JSON.stringify(newList));
  
  // removes/deletes 'currentTask' from html
  currentTask.remove();

  // this refreshes the page so localStorage is always updated
  location.replace(location.href);
}

// keeps track of task-card location 'ui' is the current dragged element
function handleDrop(event, ui) {
  let currentTask = (ui.item);
  // gets the 'id' from 'currentTask', converts it to a number to use as a key: into 'taskList'
  const taskId = Number(currentTask.attr('id'));
  // then filters out the object by the key: 'id', stores results in 'newList'
  let currentTaskIndex = taskList.findIndex(obj => obj.id == taskId)
  // gets the 'id' from parent
  let currentColumnId = ui.item.parent().attr('id');

  // updates the parentId property and stores it in localStorage
  taskList[currentTaskIndex].parentId = currentColumnId
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  
  // this is the form submit button calls handleAddTask() 
  taskSubmit.addEventListener('click', handleAddTask);
  
  // Listens in drop-columns for click, checks clicked element for class 'delete-button'
  taskDelete.forEach(column => {
    column.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-button')) {
        handleDeleteTask(event);
      }
    })
  });

  // makes these columns sortable
  $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
    connectWith: '.drop-columns',
    update: function(event, ui) {
      handleDrop(event, ui)
    }
  });

  // Allows user to select a date
  $( function() {
    $( "#task-due-date" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  });
});