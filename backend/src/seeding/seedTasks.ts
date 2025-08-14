const pool: import('pg').Pool = require('../db');
import Task = require('../models/Task');

const tasks = [
  new Task('Make breakfast', '1'),
  new Task('Read a chapter', '2'),
  new Task('Work on project', '4'),
  new Task('Exercise', '3'),
  new Task('Meditation', '1')
];

async function seed() {
  try {
    for (const task of tasks) {
      await pool.query(
        'INSERT INTO tasks (title, level) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [task.title, task.level]
      );
    }
    console.log('Tasks seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
