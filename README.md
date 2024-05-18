# Task-Board

## Description
This is a summary of what I did for the week 5 challenge. I was given starter code that had basic columns and header done in the index.html and skelaton functions to adhear to in the script.js. 

What I needed to impliment:
      
    Create a (modal form) "Task Title", "Task Due Date", "Task Description", "Submit Button".
    Dynamically display user input and previous input from localStorage. 
    Use datepicker from jQuery for selecting due date.
    Have the card asigned a color code based due date.
    Use sortable from jQuery to make the task-cards dragable.
    Save the locations when moving so they maintain their postions on page refresh.
    Create a delte button for each card that removes task-card and stored object in localStorage.

## How to use the Task-Board
    Click the "Add Task" button, 
    Enter a Task Title, 
    Select a Task Due Date, 
    Enter a Task Descriotion,
    Click the "Submit" Button.

At this point a card will generate in the "To Do" column.\
The cards are dragable and can be sorted in any column.\
The color code will be determined by the "Task Due Date" and "Today's Date".

    "Task Due Date" is before "Today's Date", the card will display "Red"
    "Task Due Date" equals "Today's Date", the card will display "Yellow"
    "Task Due Date" is after "Today's Date", the card will display "White"


To delete a Task-Card simply click the desired "Delete" button. This will perminatly remove it from the Task Board. 

## This is a link to my published webpage - [Task Board](https://rhinosstuff.github.io/Task-Board/)

![This is a video of how my Task Board works](./assets/Task-Board.gif)

## Sourced Code

Modal HTML from - [Bootstrap modal](https://getbootstrap.com/docs/5.0/components/modal/)

Sortable ui from - [jQueryUI sortable](https://jqueryui.com/sortable/)

Datepciker ui from - [jQueryUI datepicker](https://jqueryui.com/datepicker/)