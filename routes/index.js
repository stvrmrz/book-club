const router = require('express').Router();
const authRoutes = require('./authRoutes');
const homeRoutes = require('./homeRoutes');
const clubRoutes = require('./clubRoutes'); // Import club routes

// Use auth routes for authentication-related endpoints
router.use('/auth', authRoutes);

// Use club routes for the clubs page
router.use('/clubs', clubRoutes);

// Use home routes for the home page
router.use('/', homeRoutes);

module.exports = router;
