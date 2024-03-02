
export async function fetchData() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // re-throw the error to handle it elsewhere if needed
    }
}

//saveTask:
export async function saveTask(taskId, taskText) {
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
/*
export async function deleteTask(id){
        
    const deleteTaskUrl = `/api/task/${id}`;

    fetch(deleteTaskUrl, {
        method: 'DELETE',
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        //await orderTable();
        console.log(`Task with ID ${id} deleted successfully`);

    })
    .catch(error => {
        console.error('Error deleting task:', error);
        // You might want to handle this error appropriately, such as displaying an error message
    });
}

*/


export function sayHello(name,age){
console.log(`hello ${name},your age is : ${age}!`);
}