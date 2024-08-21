document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = [];

    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks(tasks);
        }
    };

    const toggleTaskStatus = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks(tasks);
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks(tasks);
    };

    const editTask = (index) => {
        const newTaskText = prompt('Edit your task:', tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            tasks[index].text = newTaskText.trim();
            renderTasks(tasks);
        }
    };

    const filterTasks = (filter) => {
        let filteredTasks;
        switch (filter) {
            case 'completed':
                filteredTasks = tasks.filter(task => task.completed);
                break;
            case 'pending':
                filteredTasks = tasks.filter(task => !task.completed);
                break;
            default:
                filteredTasks = tasks;
        }
        renderTasks(filteredTasks);
    };

    const renderTasks = (tasksToRender) => {
        taskList.innerHTML = '';
        tasksToRender.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="edit-btn">Edit</button>
                    <button class="toggle-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            // Attach event listeners to the buttons
            taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(index));
            taskItem.querySelector('.toggle-btn').addEventListener('click', () => toggleTaskStatus(index));
            taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
        });
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') addTask();
    });
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTasks(button.dataset.filter);
        });
    });
});
