let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasksCounter');

// console.log('Working');

function addTaskToDOM(task){
const li = document.createElement('li');

li.innerHTML = `
<input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
<label for="${task.id}">${task.text}</label>
<img class="list-img" height="25px" width="25px" src="https://www.shutterstock.com/image-vector/vector-trash-outline-web-icon-600w-1423557158.jpg"  id="${task.id}" />
`
taskList.append(li);
}

function renderList() {
taskList.innerHTML = '';

for(let i=0; i < tasks.length ; i++){
    addTaskToDOM(tasks[i]);
}
tasksCounter.innerHTML = tasks.length;

}

function toggleTask(taskId) {
    const taskz = tasks.filter(function(task){
        return task.id == taskId;
    })

    if(taskz.length > 0){
        const currentTask = taskz[0];

        currentTask.done = !currentTask.done;
        renderList();
        showNotification('task toggled successfully');
        return;
    }
    showNotification('could not toggle the task');
}

function deleteTask (taskId) {
    const newTask = tasks.filter(function(task){
        return task.id != taskId;
    })
    
    tasks = newTask;
    renderList();
    showNotification('task deleted successfully');
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        alert('task added successfully');
        return;
    }
     showNotification('task can not be added');
}

function showNotification(text) {
    alert(text);
    console.log('task deleted sucessfully');
}

function handleInputKeypress (e) { 
    if(e.key == 'Enter'){
    var text = e.target.value;  
    
    if(!text){
        showNotification('text can not be empty');
        return; 
    }
    const task = {
        text ,
        id : Date.now(),
        done : false 
    }
    
    e.target.value = '';
    addTask(task);
    }
}

function handleClickListner(e){
const target = e.target;
if(target.className == 'list-img'){
    const taskId = target.id;
    deleteTask(taskId);
    return;
}else if(target.className == 'custom-checkbox'){
    const taskId = target.id;
    toggleTask(taskId);
    return;
}

}

function inizializeApp(){
document.addEventListener('click' , handleClickListner);
addTaskInput.addEventListener('keyup' , handleInputKeypress);
}

inizializeApp();
