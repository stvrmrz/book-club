const router = require('express').Router();
const bookController = require('../controllers/bookController');

// Route to handle book creation
router.post('/', bookController.createBook);

// Route to get all books
router.get('/', bookController.getBooks);

module.exports = router;
