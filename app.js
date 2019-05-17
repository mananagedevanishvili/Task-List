// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners(){
    // Add task event

    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasj events
    filter.addEventListener('keyup', filterTasks);
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    
}
// Get Tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
        //Create li element
        let li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        let link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
        // Store in LS

    });

}

// Add Task
function addTask(e){
    
    if(taskInput.value === ''){
        alert('Add a task');
    }
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    // Store in LS
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
    
    e.preventDefault();
    
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLOcalStorage(e.target.parentElement.parentElement);
        }
        
        
    }

}

function removeTaskFromLOcalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
    //taskList.innerHTML = '';
    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //Clear Tasks from LS
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            console.log(task.firstChild.textContent)
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}