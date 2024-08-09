const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { Club } = require('../models');

// Route to get all clubs
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const clubs = await Club.findAll();
    
    // Log fetched clubs data
    console.log('Fetched clubs:', JSON.stringify(clubs, null, 2));

    res.render('pages/clubs', { title: 'Book Clubs', clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ error: 'Failed to fetch clubs' });
  }
});

// Route to render the form for creating a new club
router.get('/new', isLoggedIn, (req, res) => {
  res.render('pages/newClub', { title: 'New Club' });
});

// Route to create a new club
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const newClub = await Club.create({
      name: req.body.name,
      description: req.body.description,
      userId: req.session.user.id // Associate club with the logged-in user
    });

    // Log the newly created club
    console.log('New club created:', JSON.stringify(newClub, null, 2));

    res.redirect('/clubs');
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: 'Failed to create club' });
  }
});

module.exports = router;
