//import { fetchData ,saveTask} from "./server";
import { sayHello } from "./server";
/*
export async function loadTasks() {
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
export async function addTask(taskText,save) {
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

*/
export function fact(number){
    return number <=1 ?1:number*fact(number-1); 
}


export function details({name,age,job}){
    sayHello(name,age);
    console.log(`your jo is : ${job}`);
}