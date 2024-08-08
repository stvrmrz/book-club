const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { Club } = require('../models');

// Route to get all clubs
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const clubs = await Club.findAll();
    res.render('pages/clubs', { title: 'Book Clubs', clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

// Route to render the form for adding a new club
router.get('/new', isLoggedIn, (req, res) => {
  res.render('pages/newClub', { title: 'New Club' });
});

// Route to create a new club
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const newClub = await Club.create({
      name: req.body.name,
      description: req.body.description,
      userId: req.session.user.id // Ensure the club is associated with the logged-in user
    });
    res.redirect('/clubs');
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: 'Failed to create club' });
  }
});

module.exports = router;
