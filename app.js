import  express  from 'express';
import  path  from 'path';
import { fileURLToPath } from 'url';
import { 
    getTasks,
    getTask,
    createTask,
    deleteTask,
    completeTask
} from './database.js';
//import dotenv from 'dotenv'

//[npm run dev]
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());


// Serve static files from the 'front-end' directory
app.use(express.static(path.join(__dirname, 'front-end')));


const PORT = process.env.PORT || 3000;

app.get("/api/tasks", async (req,res) =>{
    const tasks = await getTasks();
    console.log(tasks);
    res.send(tasks);
});
 
app.post('/api/completeTask/:id', async (req, res) => {
    try {
      const c = await completeTask(req.params.id);
      res.status(201).send(c);
    } catch (error) {
      console.error('Error completing task:', error);
      res.status(500).send('An error occurred while completing the task.');
    }
  });


app.get("/api/task/:id", async (req,res) =>{
    const id = req.params.id;
    const task = await getTask(id);
    res.status(201).send(task);
});

// app.get('/api/order-tasks', async (req, res) => {
//     try {
//       const success = await orderTasks();
//       if (success) {
//         res.send('Tasks ordered successfully');
//       } else {
//         res.status(500).send('Failed to order tasks');
//       }
//     } catch (error) {
//       console.error('Error ordering tasks:', error);
//       res.status(500).send('An error occurred while ordering tasks');
//     }
//   });

app.post('/api/task',async (req ,res) =>{
    const {name,content} = req.body;
    const task = await createTask(name,content);
    res.send(task); 
})


// DELETE endpoint to delete a task
app.delete('/api/task/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    
    try {
        // Call the deleteTask function passing the connection and taskId
        await deleteTask(taskId);
        
        // Send a success response
        res.status(200).json({ message: `Task with ID ${taskId} deleted successfully` });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: 'Unable to delete task' });
    }
});

app.use((err,req,res,next) =>{
    console.log(err.stack);
    res.status(500).send('Something broke');
})

app.listen(PORT,() =>{
  console.log(`server is lestening on port ${PORT}!`);
});

