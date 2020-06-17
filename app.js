//Define UI Vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");

//Load all event listeners call
loadEventListeners();

//load all event listeners we separate these out for debugging and we can shut them off at a whim to test each one
function loadEventListeners() {
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  //Add task event
  form.addEventListener("submit", addTask);

  //Remove task event
  taskList.addEventListener("click", removeTask);

  //Clear task event
  clearBtn.addEventListener("click", clearTasks);

  //Filter task event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from Local Storage

function getTasks() {
  let tasks; //initialize tasks
  if (localStorage.getItem("tasks") === null) {
    //check if stuff there
    tasks = [];
  } else {
    //if so, do the storing
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //Create li element

    const li = document.createElement("li");
    //add class
    li.className = "collection-item";

    //Create text node and append to li list
    li.appendChild(document.createTextNode(task));

    //create new link element
    const link = document.createElement("a");

    //add class
    link.className = "delete-item secondary-content";

    //add icon html
    link.innerHTML = '<i class="fas fa-trash"></i>';

    //append the link to the li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

//Add Task function
function addTask(e) {
  if (taskInput.value.trim() === "") {
    //checks to see if input or if spaces and cuts them
    alert("No input!");
  } else {
    //Create li element

    const li = document.createElement("li");
    //add class
    li.className = "collection-item";

    //Create text node and append to li list
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement("a");

    //add class
    link.className = "delete-item secondary-content";

    //add icon html
    link.innerHTML = '<i class="fas fa-trash"></i>';

    //append the link to the li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input line after submitting
    taskInput.value = "";
  }
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
      //Remove from the Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  // console.log(taskItem);
  let tasks; //initialize tasks
  if (localStorage.getItem("tasks") === null) {
    //check if stuff there
    tasks = [];
  } else {
    //if so, do the storing
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
  //Easier to write
  //taskList.innerHTML = "";
  //Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear tasks from Local Storage
  clearTasksFromLocalStorage();
}

//Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  // console.log(text);
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
