// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to HTML elements
    const taskForm = document.getElementById('taskForm');
    const taskTable = document.getElementById('taskTable');
  
    // Load tasks from localStorage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to update and save the task list
    function updateTaskList() {
      // Clear existing table rows
      while (taskTable.rows.length > 1) {
        taskTable.deleteRow(1);
      }
  
      // Insert new tasks into the table
      tasks.forEach(function(task, index) {
        const newRow = taskTable.insertRow(-1);
        const nameCell = newRow.insertCell(0);
        const descriptionCell = newRow.insertCell(1);
        const dueDateCell = newRow.insertCell(2);
        const priorityCell = newRow.insertCell(3);
        const assignedToCell = newRow.insertCell(4);
        const deleteCell = newRow.insertCell(5);
  
        nameCell.innerText = task.name;
        descriptionCell.innerText = task.description;
        dueDateCell.innerText = task.dueDate;
        priorityCell.innerText = task.priority;
        assignedToCell.innerText = task.assignedTo;
  
        // Create a delete button for each task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
          deleteTask(index);
        });
        deleteCell.appendChild(deleteButton);
      });
  
      // Save tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Function to handle form submission
    function handleFormSubmit(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get form values
      const taskName = document.getElementById('taskName').value;
      const taskDescription = document.getElementById('taskDescription').value;
      const dueDate = document.getElementById('dueDate').value;
      const taskPriority = document.getElementById('taskPriority').value;
      const assignedTo = document.getElementById('assignedTo').value;
  
      // Create a new task object
      const newTask = {
        name: taskName,
        description: taskDescription,
        dueDate: dueDate,
        priority: taskPriority,
        assignedTo: assignedTo
      };
  
      // Add the new task to the tasks array
      tasks.push(newTask);
  
      // Update the task list
      updateTaskList();
  
      // Reset the form
      taskForm.reset();
    }
  
    // Function to delete a task
    function deleteTask(index) {
      tasks.splice(index, 1); // Remove the task from the array
      updateTaskList(); // Update the task list
    }
  
    // Function to check for due tasks and show notifications
    function checkDueTasks() {
      const now = new Date();
      tasks.forEach(function(task) {
        const dueDate = new Date(task.dueDate);
        if (dueDate <= now) {
          alert(`Task "${task.name}" is due!\nDue Date: ${task.dueDate}`);
        }
      });
    }
  
    // Add event listener to the form submission
    taskForm.addEventListener('submit', handleFormSubmit);
  
    // Update the task list on initial page load
    updateTaskList();
  
    // Check for due tasks every minute (60000 milliseconds)
    setInterval(checkDueTasks, 60000);
  });
  