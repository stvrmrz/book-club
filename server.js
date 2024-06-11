const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes'); // Importing routes
const { sequelize } = require('./models'); // Importing Sequelize instance from models/index.js
const path = require('path');
const methodOverride = require('method-override'); // Importing method-override
const socketio = require('socket.io');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method')); // Adding method-override middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(routes); // Using routes

sequelize.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  const io = socketio(server);
  io.on('connection', (socket) => {
    console.log('New WS Connection...');
  });
});
