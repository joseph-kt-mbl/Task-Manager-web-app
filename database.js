
import dotenv from 'dotenv'

dotenv.config();


import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Qwerty_MySql-Root#255',
  database: 'TASK_APP_DB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to get all tasks
export async function getTasks() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM tasks");
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error getting tasks:', error);
    throw error;
  }
}

// Function to get a task by ID
export async function getTask(id) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tasks WHERE id = ?', [id]);
    connection.release();
    return rows[0];
  } catch (error) {
    console.error('Error getting task by ID:', error);
    throw error;
  }
}

// Function to create a new task
export async function createTask(taskName, taskContent) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO tasks (name, content) VALUES (?, ?)', [taskName, taskContent]);
    const taskId = result.insertId;
    connection.release();
    await orderTasks();
    return getTask(taskId);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Function to order tasks by updating their IDs
export async function orderTasks() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Retrieve all tasks ordered by their IDs
    const [rows] = await connection.query('SELECT id FROM tasks ORDER BY id');

    // Update IDs of tasks sequentially
    for (let i = 0; i < rows.length; i++) {
      await connection.query('UPDATE tasks SET id = ? WHERE id = ?', [i + 1, rows[i].id]);
    }

    // Commit the transaction
    await connection.commit();
    return true; // Return true to indicate successful ordering
  } catch (error) {
    await connection.rollback();
    console.error('Error ordering tasks:', error);
    return false; // Return false to indicate failure
  } finally {
    connection.release();
  }
}

// Function to delete a task by ID
export async function deleteTask(taskId) {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    connection.release();

    // After deleting the task, order the tasks in the table
    await orderTasks();

    return true; // Return true to indicate successful deletion and ordering
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}


export async function completeTask(taskId) {
    return new Promise(async (resolve, reject) => {
      const connection = await pool.getConnection();
      const query = 'UPDATE tasks SET complete = true WHERE id = ?';
      connection.query(query, [taskId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
}
