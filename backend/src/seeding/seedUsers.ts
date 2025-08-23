const pool: import('pg').Pool = require('../db');
import User = require('../models/User');

const users = [
  new User('testuser1', 'testemail1@gmail.com', 'hashedpassword1'),
  new User('testuser2', 'testemail2@gmail.com', 'hashedpassword2'),
];

async function seed() {
  try {
    for (const user of users) {
      await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
        [user.username, user.email, user.password_hash]
      );
    }
    console.log('Users seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
