const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

// Placeholder for routes
app.use('/auth', (req, res) => res.send('Auth route placeholder'));
app.use('/books', (req, res) => res.send('Books route placeholder'));
app.use('/clubs', (req, res) => res.send('Clubs route placeholder'));
app.use('/meetings', (req, res) => res.send('Meetings route placeholder'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
