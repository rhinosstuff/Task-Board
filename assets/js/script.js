const taskName = document.querySelector('#task-name');
const taskDueDate = document.querySelector('#task-due-date');
const taskDescription = document.querySelector('#task-description');
const taskSubmit = $('#task-submit');
const todoCards = document.querySelector('#todo-cards');
const inProgressCards = document.querySelector('#in-progress-cards');
const doneCards = document.querySelector('#done-cards');
const lanes = $('.swim-lanes');

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
  console.log(`This is a test: ${task}`)
  console.log(task)
  if (task !== null) {
    for (let i = 0; i < task.length; i++) {
      const addCard = task[i];
  
      const card = document.createElement('div');
      card.id = addCard.id;
      card.className = 'card task-card text-white bg-danger m-3';
      if (addCard.parentId = 'todo-cards') {
        todoCards.appendChild(card);
        console.log(`todo-cards ${addCard.id}: parentId = ${addCard.parentId}`); 
      } else if (addCard.parentId = 'in-progress-cards') {
        inProgressCards.appendChild(card);
        console.log(`in-progress-cards ${addCard.id}: parentId = ${addCard.parentId}`);
      } else if (addCard.parentId = 'done-cards') {
        doneCards.appendChild(card);
        console.log(`done-cards ${addCard.id}: parentId = ${addCard.parentId}`);
      }

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      card.appendChild(cardBody);

      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title border-bottom';
      cardTitle.textContent = addCard.taskName;
      cardBody.appendChild(cardTitle);

      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = addCard.taskDescription;
      cardBody.appendChild(cardText);

      const cardDate = document.createElement('div');
      cardDate.className = 'card-date';
      cardDate.textContent = addCard.taskDueDate;
      cardBody.appendChild(cardDate);

      const cardButton = document.createElement('button');
      cardButton.type = 'button';
      cardButton.className = 'btn btn-danger border delete-button';
      cardButton.textContent = 'Delete'
      cardBody.appendChild(cardButton);

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
    taskName: taskName.value.trim(),
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
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  $(event.target).parent().parent().remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  
  taskSubmit.on('click', handleAddTask)
  
  // Listens in swim-lanes for clik on 
  lanes.on('click', '.delete-button', handleDeleteTask);

  // Allows user to move cards inbetween swim-lanes
  $( function() {
    $( "#todo-cards, #in-progress-cards, #done-cards" ).sortable({
      connectWith: ".ui-sortable",
      update: function(event, ui) {
  
        console.log($(this).attr('id'));
        console.log(ui);
        console.log(ui);
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




