const router = require('express').Router();
const { Club } = require('../models');
const { isLoggedIn } = require('../middlewares/authMiddleware'); // Middleware to check if logged in

// Route for displaying all clubs
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const clubs = await Club.findAll();
    console.log('Clubs fetched successfully:', clubs);
    res.render('pages/clubs', { title: 'Book Clubs', clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

// Route for displaying the form to add a new club
router.get('/new', isLoggedIn, (req, res) => {
  res.render('pages/newClub', { title: 'Add New Club' });
});

// Route for handling the form submission to add a new club
router.post('/new', isLoggedIn, async (req, res) => {
  try {
    const { name, description } = req.body;
    await Club.create({ name, description, userId: req.session.user.id });
    res.redirect('/clubs');
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: 'Failed to create club' });
  }
});

module.exports = router;
