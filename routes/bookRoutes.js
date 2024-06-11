const router = require('express').Router();
const bookController = require('../controllers/bookController');

// Route to handle book creation
router.post('/', bookController.createBook);

// Route to get books by club ID
router.get('/club/:clubId', bookController.getBooksByClub);

// Route to search books using external API
router.get('/search', bookController.searchBooks); // Change to match the query string pattern

module.exports = router;
