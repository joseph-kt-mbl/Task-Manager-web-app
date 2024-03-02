//import { fact,details} from "./utils.js";
import { sayHello } from "./server.js";


document.addEventListener("DOMContentLoaded", async function() { 

    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    
async function fetchData() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // re-throw the error to handle it elsewhere if needed
    }
}
    
async function loadTasks() {
    try {
        const data = await fetchData();
        for (let k = 0; k < data.length; k++) {
            addTask(data[k].content,false);
        }
        console.log(data);
    } catch (error) {
        //console.error('Error fetching data:', error);
    }
}
 async function addTask(taskText,save) {
    const taskId = Date.now().toString();

    let myLi = document.createElement('li');
        myLi.setAttribute('data-id',taskId);

    let myTextSpan = document.createElement('span');
        myTextSpan.classList.add('task-text');
        myTextSpan.textContent = taskText;

    let myActionsSpan = document.createElement('span');
        myActionsSpan.classList.add('task-actions');

        let completeBtn = document.createElement('button');
            completeBtn.classList.add('completed-toggle');
            completeBtn.textContent = '✔️';
            
            completeBtn.addEventListener('click',async e => {
                console.log("Complete Button Clicked !");
               // console.log(fact(5))
                sayHello("youcef",19.5)
                // details({
                //     name:"youcef",
                //     age:20,
                //     job:"developer",
                // })
            })

        let deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete');
            deleteBtn.textContent = '❌';

        myActionsSpan.append(completeBtn);
        myActionsSpan.append(deleteBtn);

        myLi.appendChild(myTextSpan);
        myLi.appendChild(myActionsSpan);

        taskList.prepend(myLi);
    
        let AllTasks = [...document.querySelectorAll('#task-list li')]
        let index = AllTasks.indexOf(myLi);

        deleteBtn.addEventListener('click',async e => {
                let id = AllTasks.length - index ;
                
                console.log('#'.repeat(50));
                console.log(`deletig task#${id}:)`);
                console.log('#'.repeat(50));
                
                await deleteTask(id);
                deleteBtn.closest('li').remove();
            
            })
    
    
    if(save){
    saveTask(taskId,taskText);
    }
}

    

    // Load tasks when the DOM is loaded
    await loadTasks();
    // Add task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim(),true);
            taskInput.value = ''; // Clear input
            console.log("Enter clicked !");
        }
    });


    async function saveTask(taskId, taskText) {
        try {
            const response = await fetch('/api/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: taskId, content: taskText })
            });
            if (!response.ok) {
                throw new Error('Failed to save task');
            }
            //await orderTable();
            console.log('Task saved successfully');
        } catch (error) {
            console.error('Error saving task:', error);
            // You might want to handle this error appropriately, such as displaying an error message
        }
    }
   
    async function deleteTask(id){
        
        const deleteTaskUrl = `/api/task/${id}`;

        fetch(deleteTaskUrl, {
            method: 'DELETE',
        })
        .then(async response => {
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            console.log(`Task with ID ${id} deleted successfully`);

        })
        .catch(error => {
            console.error('Error deleting task:', error);
            // You might want to handle this error appropriately, such as displaying an error message
        });
    }

});













            // Delete task
            // taskList.addEventListener('click', function(event) {
            //     if (event.target.classList.contains('delete')) {
            //         const taskId = event.target.parentElement.dataset.id;
            //         deleteTask(taskId);
            //     }
            // });

            // // Toggle completed
            // taskList.addEventListener('click', function(event) {
            //     if (event.target.classList.contains('completed-toggle')) {
            //         const taskId = event.target.parentElement.dataset.id;
            //         toggleCompleted(taskId);
            //     }
            // });

        //     function deleteTask(taskId) {
        //         const taskItem = document.querySelector(`[data-id="${taskId}"]`);
        //         if (taskItem) {
        //             taskItem.remove();
        //             removeTaskFromStorage(taskId);
        //         }
        //     }

        //     function toggleCompleted(taskId) {
        //         const taskItem = document.querySelector(`[data-id="${taskId}"]`);
        //         if (taskItem) {
        //             taskItem.querySelector('.task-text').classList.toggle('completed');
        //             updateTaskInStorage(taskId);
        //         }
        //     }

        //     function saveTask(taskId, taskText) {
        //         let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //         tasks.push({ id: taskId, text: taskText, completed: false });
        //         localStorage.setItem('tasks', JSON.stringify(tasks));
        //     }
