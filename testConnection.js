const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
