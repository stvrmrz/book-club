const router = require('express').Router();
const clubController = require('../controllers/clubController');

// Route to handle club creation
router.post('/', (req, res, next) => {
  console.log("POST /clubs hit");
  next();
}, clubController.createClub);

// Route to get all clubs
router.get('/', (req, res, next) => {
  console.log("GET /clubs hit");
  next();
}, clubController.getAllClubs);

// Route to get a specific club by ID
router.get('/:id', (req, res, next) => {
  console.log("GET /clubs/:id hit with ID:", req.params.id);
  next();
}, clubController.getClubById);

// Route to delete a specific club by ID
router.delete('/:id', (req, res, next) => {
  console.log("DELETE /clubs/:id hit with ID:", req.params.id);
  next();
}, clubController.deleteClub);

// Test route to verify routing
router.get('/test/:id', (req, res) => {
  console.log("Test route hit with ID:", req.params.id);
  res.send(`Test route hit with ID: ${req.params.id}`);
});

module.exports = router;
