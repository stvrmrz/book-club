const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');
const sequelize = require('./config/connection');
const path = require('path');
const methodOverride = require('method-override');

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

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  next();
});

app.use(routes);

const startServer = async () => {
  try {
    console.log('Attempting to authenticate database connection...');
    await sequelize.authenticate();
    console.log('Database connection authenticated successfully.');
    
    console.log('Attempting to sync database...');
    await sequelize.sync({ force: true });
    console.log('Database synced successfully.');

    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.error('Unable to start the server:', error);
  }
};

startServer();
