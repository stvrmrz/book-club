const { Client } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432, // Default PostgreSQL port
  ssl: false // Disable SSL
});

client.connect()
  .then(() => {
    console.log('Connected to database successfully');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('Current time:', res.rows[0]);
  })
  .catch(err => {
    console.error('Connection error', err.stack);
  })
  .finally(() => {
    client.end();
  });
