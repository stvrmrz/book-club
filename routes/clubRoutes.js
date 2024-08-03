const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/authMiddleware'); // Middleware to check if logged in

router.get('/', isLoggedIn, (req, res) => {
  // Dummy list of book clubs
  const clubs = [
    { name: 'Sci-Fi Lovers', description: 'A club for fans of science fiction books.' },
    { name: 'Historical Fiction', description: 'Discuss historical fiction books here.' },
    // Add more clubs as needed
  ];
  res.render('pages/clubs', { title: 'Book Clubs', clubs });
});

module.exports = router;
