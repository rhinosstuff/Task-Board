const taskTitle = document.querySelector('#task-title');
const taskDueDate = document.querySelector('#task-due-date');
const taskDescription = document.querySelector('#task-description');
const taskSubmit = $('#task-submit');
const todoCards = document.querySelector('#todo-cards');
const inProgressCards = document.querySelector('#in-progress-cards');
const doneCards = document.querySelector('#done-cards');
const swimLanes = $('.swim-lanes');

// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
  nextId ++;
  localStorage.setItem('nextId', nextId);
  console.log(nextId)
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // console.log(task)
  if (task !== null) {
    for (let i = 0; i < task.length; i++) {
      const addCard = task[i];
  
      const taskCard = document.createElement('div');
      taskCard.id = addCard.id;
      taskCard.className = 'card task-card';
      todoCards.appendChild(taskCard);

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

      const today = dayjs().format('MM/DD/YYYY');
      const dueDate = cardDate.textContent
      console.log(today)
      console.log(dueDate)
      
      if (today === dueDate) {
        console.log(today === dueDate)
        taskCard.className = 'card task-card bg-warning text-white';
      } else if (today > dueDate) {
        console.log(today === cardDate)
        taskCard.className = 'card task-card bg-danger text-white';
      }

    }
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  createTaskCard(taskList);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
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
  
  let task = [];
  if (taskList !== null) {
    task = taskList;
  }
  
  console.log(newTask);
  task.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(task));
  createTaskCard(addNewCard);

  taskTitle.value = '';
  taskDescription.value = '';
  taskDueDate.value = '';
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  
  let currentTask = $(event.target).parent().parent();
  
  const taskId = Number(currentTask.attr('id'));

  let newList = [];
  if (taskList !== null) {
    newList = taskList;
  }
  
  
  console.log(newList);
  // localStorage.removeItem('tasks');
  localStorage.setItem('tasks', JSON.stringify(newList.filter(item => item.id !== taskId)));
  currentTask.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  
  taskSubmit.on('click', handleAddTask)
  
  // Listens in swim-lanes for clik on 
  swimLanes.on('click', '.delete-button', handleDeleteTask);

  // Allows user to move cards inbetween swim-lanes
  $( function() {
    $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
      connectWith: ".ui-sortable",
      update: function(event, ui) {

      }
    }).disableSelection();
  });

  // Allows user to select a date
  $( function() {
    $( "#task-due-date" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
  });
});