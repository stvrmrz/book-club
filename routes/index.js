const router = require('express').Router();
const authRoutes = require('./authRoutes');
const bookRoutes = require('./bookRoutes');
const homeRoutes = require('./homeRoutes');

// Use auth routes for authentication-related endpoints
router.use('/auth', authRoutes);

// Use book routes for book-related endpoints
router.use('/books', bookRoutes);

// Use home routes for the home page
router.use('/', homeRoutes);

module.exports = router;
