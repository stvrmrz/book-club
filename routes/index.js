const router = require('express').Router();
const authRoutes = require('./authRoutes');
const homeRoutes = require('./homeRoutes');

// Use auth routes for authentication-related endpoints
router.use('/auth', authRoutes);

// Use home routes for the home page
router.use('/', homeRoutes);

module.exports = router;
