const router = require('express').Router();
const authController = require('../controllers/authController');

// Route for rendering login page
router.get('/login', (req, res) => {
  res.render('pages/login', { title: 'Login' });
});

// Route for rendering signup page
router.get('/signup', (req, res) => {
  res.render('pages/signup', { title: 'Signup' });
});

// Other auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
