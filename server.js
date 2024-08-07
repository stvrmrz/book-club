const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const { Sequelize } = require('sequelize');

// Determine the appropriate database connection settings based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = isProduction ? {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
} : {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'postgres'
};

console.log('DB Connection Details:', isProduction ? process.env.DATABASE_URL : dbConfig);

const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, dbConfig)
  : new Sequelize(dbConfig);

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

const hbs = exphbs.create({});
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

// Cache-Control Middleware to prevent caching during development
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Add middleware to make session data available to views
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn || false;
  res.locals.user = req.session.user || null;
  console.log('User session data:', req.session.user);
  next();
});

const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const clubRoutes = require('./routes/clubRoutes');

// Use routes
app.use('/auth', authRoutes);
app.use('/', homeRoutes);
app.use('/clubs', clubRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ force: false });

    console.log('Database synced successfully.');

    const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.error('Unable to start the server:', error.message, error.stack);
  }
};

startServer();
