import express = require('express');
import cors = require('cors');
const pool = require('./db');
const tasksRouter = require('./routes/tasks');
import dotenv = require('dotenv');
import errorHandler = require('./middleware/errorHandler');
import requestLogger = require('./middleware/requestLogger');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api', tasksRouter);

app.get('/test-db', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.get('/', (_req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(errorHandler);
