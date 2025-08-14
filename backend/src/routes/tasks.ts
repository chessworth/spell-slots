import express = require('express');
const pool: import('pg').Pool = require('../db');
import Task = require('../models/Task');
import fromDbRow = require('../utils/fromDbRow');

const router = express.Router();

// Interface for incoming task data
interface TaskPayload {
  title: string;
  level: string;
}

// GET /tasks
router.get('/tasks', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    const tasks = result.rows.map((row: any) => fromDbRow(row, Task, ['created_at']));
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// POST /tasks
router.post('/tasks', async (req, res) => {
  const { title, level } = req.body as TaskPayload;

  // Validation
  if (!title) return res.status(400).send('Missing title');
  if (!level) return res.status(400).send('Missing level');
  if (!['1','2','3','4','5','6','7','8','9'].includes(level)) return res.status(400).send('Invalid level');

  try {
    const newTask = new Task(title, level);
    const result = await pool.query(
      'INSERT INTO tasks (title, level) VALUES ($1, $2) RETURNING *',
      [newTask.title, newTask.level]
    );

    res.status(201).json(fromDbRow(result.rows[0], Task, ['created_at']));
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// PATCH /tasks/:id
router.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, level } = req.body as Partial<TaskPayload>;

  if (!id || isNaN(Number(id))) return res.status(400).send('Missing or invalid id');
  if (level && !['1','2','3','4','5','6','7','8','9'].includes(level)) return res.status(400).send('Invalid level');

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = COALESCE($1, title),
           level = COALESCE($2, level)
       WHERE id = $3
       RETURNING *`,
      [title, level, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(fromDbRow(result.rows[0], Task, ['created_at']));
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// DELETE /tasks/:id
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) return res.status(400).send('Missing or invalid id');

  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted', task: fromDbRow(result.rows[0], Task, ['created_at']) });
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
