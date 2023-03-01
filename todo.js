let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const darkMode = document.getElementById('nightMode');
const body = document.querySelector('body');
const newTitle = document.getElementById('title');

console.log('Loaded');

function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="https://pluspng.com/img-png/delete-button-png-delete-icon-1600.png" class="delete" id="${task.id}" />
    `;

    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML = '';

    for(let i = 0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
}

function toggleTask (taskId) { //marking the task as complete
    const task = tasks.filter(function(task){
        return task.id === taskId;
    });

    if(task.length > 0){
        const currentTask = task[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully');
        return;
    }
    showNotification('Could not toggle the task');
}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId;
    });

    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added successfully');
        return;
    }
}

function showNotification(text) {
    alert(text);
}

function handleInputKeypress(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        console.log('text', text);

        if(!text){
            showNotification('Task text cannot be empty');
            return;
        }

        const task = {
            text : text,
            id: Date.now().toString(),
            done: false // because initially the task is not done and is empty
        }

        console.log(task);

        e.target.value = '';
        addTask(task);
    }
}

function handleClickListener(e){
    const target = e.target;

    if(target.className === 'delete'){
        const taskId = target.id;
        deleteTask(taskId);
        return;
    } else if(target.className === 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}

function handleNightMode(){
    if(this.classList.toggle('changeMode')){
        body.style.backgroundColor = 'white';
        body.style.color = 'black';
        body.style.transition = '1s';
        newTitle.innerHTML = 'Enable Dark Mode';
        tasksList.style.backgroundColor= 'white';
        addTaskInput.style.backgroundColor = 'white';
        darkMode.style.border = '2px solid #0079bf';
        darkMode.style.color = 'black';
        darkMode.style.backgroundColor = 'white';
    }
    else if( newTitle.innerHTML = 'Enable Light Mode' ){
        body.style.backgroundColor = '#0b3239';
        body.style.color = 'white';
        body.style.transition = '1s';
        newTitle.innerHTML = 'Enable Light Mode';
        tasksList.style.backgroundColor= '#e6eacf';
        tasksList.style.color= 'black';
        addTaskInput.style.backgroundColor = '#e6eacf';
        darkMode.style.border = '2px solid #e6eacf';
        darkMode.style.color = '#514b4b';
        darkMode.style.backgroundColor = '#e6eacf';
        }
}

function initializeApp(){

    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
    darkMode.addEventListener('click', handleNightMode);

    }
    
initializeApp();