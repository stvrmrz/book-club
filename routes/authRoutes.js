const router = require('express').Router();
const authController = require('../controllers/authController');

// Route for rendering login page
router.get('/login', (req, res) => {
  console.log("Login route hit");
  res.render('pages/login', { title: 'Login' });
});

// Route for rendering signup page
router.get('/signup', (req, res) => {
  console.log("Signup route hit");
  res.render('pages/signup', { title: 'Signup' }); // Ensure the correct path to the signup view
});

// Other auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
