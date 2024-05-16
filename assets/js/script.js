const taskTitle = document.querySelector('#task-title');
const taskDueDate = document.querySelector('#task-due-date');
const taskDescription = document.querySelector('#task-description');
const taskSubmit = $('#task-submit');
const todoCards = document.querySelector('#todo-cards');
const inProgressCards = document.querySelector('#in-progress-cards');
const doneCards = document.querySelector('#done-cards');
const taskDelete = $('.swim-lanes');

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
  nextId ++;
  localStorage.setItem('nextId', nextId);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  console.log('task', task)
  if (task !== null) {
    for (let i = 0; i < task.length; i++) {
      const addCard = task[i];
  
      const taskCard = document.createElement('div');
      taskCard.id = addCard.id;
      taskCard.className = 'card task-card m-3';
      if (addCard.parentId === 'in-progress-cards') {
        inProgressCards.appendChild(taskCard);
      } else if (addCard.parentId === 'done-cards') {
        doneCards.appendChild(taskCard);
      } else {
        todoCards.appendChild(taskCard);
      } 
      
      const taskBody = document.createElement('div');
      taskBody.className = 'card-body';
      taskCard.appendChild(taskBody);

      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title border-bottom border-2';
      cardTitle.textContent = addCard.taskTitle;
      taskBody.appendChild(cardTitle);

      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = addCard.taskDescription;
      taskBody.appendChild(cardText);

      const cardDate = document.createElement('div');
      cardDate.className = 'card-date';
      cardDate.textContent = addCard.taskDueDate;
      taskBody.appendChild(cardDate);

      const cardButton = document.createElement('button');
      cardButton.type = 'button';
      cardButton.className = 'btn btn-danger border delete-button';
      cardButton.textContent = 'Delete'
      taskBody.appendChild(cardButton);

      // compares todays date with task duedate to update color of card
      const today = dayjs().format('MM/DD/YYYY');
      const dueDate = cardDate.textContent
      
      if (today === dueDate) {
        taskCard.className = 'card task-card m-3 bg-warning text-white';
      } else if (today > dueDate) {
        taskCard.className = 'card task-card m-3 bg-danger text-white';
      }

    }
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  if (taskList !== null) {
    createTaskCard(taskList);
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault()
  
  generateTaskId();
  let addNewCard = [];
  const newTask = {
    parentId: 'todo-cards',
    id: nextId,
    taskTitle: taskTitle.value.trim(),
    taskDescription: taskDescription.value.trim(),
    taskDueDate: taskDueDate.value 
  }
  addNewCard.push(newTask);
  console.log('addNewCard', addNewCard)
  
  let task = [];
  if (taskList !== null) {
    console.log('taskList !-- null', taskList) 
    task = taskList;
  }
  console.log('task should = tasks LS', task)

  task.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(task));
  console.log('LS tasks: ', JSON.parse(localStorage.getItem("tasks")))
  taskTitle.value = '';
  taskDescription.value = '';
  taskDueDate.value = '';
  
  createTaskCard(addNewCard);
  location.replace(location.href);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  // gets the '.delete-button' parent parent we want to remove
  let currentTask = $(event.target).parent().parent();
  // gets the 'id' from 'currentTask', converts it to a number to use as a key: into 'taskList'
  const taskId = Number(currentTask.attr('id'));

  let newList = [];
  // checks to make sure there is data in the 'taskList'
  // then filters out the object by the key: 'id', stores results in 'newList'
  if (taskList !== null) {
    newList = taskList.filter(item => item.id !== taskId)
  }
  
  // sets 'newList' in 'tasks' in localStorage
  localStorage.setItem('tasks', JSON.stringify(newList));
  // removes currentTask from html
  currentTask.remove();
  location.replace(location.href);
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  let currentTask = $(ui.item);
  // gets the 'id' from 'currentTask', converts it to a number to use as a key: into 'taskList'
  const taskId = Number(currentTask.attr('id'));
  let currentColumnId = ui.item.parent().attr('id');
  
  // then filters out the object by the key: 'id', stores results in 'newList'
  let currentTaskIndex = taskList.findIndex(obj => obj.id == taskId)

  taskList[currentTaskIndex].parentId = currentColumnId
  localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  
  taskSubmit.on('click', handleAddTask)
  
  // Listens in swim-lanes for clik on delete-button
  taskDelete.on('click', '.delete-button', handleDeleteTask);


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


  // Allows user to move cards inbetween swim-lanes
  // $( function() {
  //   $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
  //     connectWith: ".ui-sortable",
  //     update: function(event, ui) {
  //       handleDrop(event, ui)
  //     }
  //   }).disableSelection();
  // });