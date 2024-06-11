const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
require('dotenv').config();

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create();

// Set up Handlebars as the template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Use environment variable for secret key
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save uninitialized session
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Placeholder routes
app.use('/auth', (req, res) => res.send('Auth route placeholder'));
app.use('/books', (req, res) => res.send('Books route placeholder'));
app.use('/clubs', (req, res) => res.send('Clubs route placeholder'));
app.use('/meetings', (req, res) => res.send('Meetings route placeholder'));

// Sync database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
