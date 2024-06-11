const { Club, User, Book } = require('../models');

// Function to get all clubs
const getAllClubs = async (req, res) => {
  try {
    console.log("getAllClubs hit"); // Debugging log
    const clubs = await Club.findAll({
      include: [{ model: User, as: 'owner' }]
    });
    console.log("Clubs data:", JSON.stringify(clubs, null, 2)); // Log the data being passed
    res.render('pages/clubs', { title: 'Book Clubs', clubs: clubs.map(club => club.toJSON()) });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Function to get a specific club by ID
const getClubById = async (req, res) => {
  try {
    console.log("getClubById hit with ID:", req.params.id); // Debugging log
    const club = await Club.findByPk(req.params.id, {
      include: [
        { model: User, as: 'owner' },
        { model: Book, as: 'books' }
      ]
    });
    if (!club) {
      console.log("Club not found"); // Debugging log
      res.status(404).json({ message: 'Club not found' });
      return;
    }
    console.log("Rendering club page", club); // Debugging log
    res.render('pages/club', { title: club.name, club });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Function to create a new club
const createClub = async (req, res) => {
  try {
    console.log("createClub hit"); // Debugging log
    const newClub = await Club.create({
      name: req.body.name,
      description: req.body.description,
      userId: req.session.userId // Assuming user is logged in and their ID is stored in session
    });
    res.redirect('/clubs');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Function to delete a club by ID
const deleteClub = async (req, res) => {
  try {
    console.log("deleteClub hit with ID:", req.params.id); // Debugging log
    const result = await Club.destroy({
      where: {
        id: req.params.id
      }
    });
    if (result === 0) {
      res.status(404).json({ message: 'Club not found' });
    } else {
      res.redirect('/clubs');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllClubs,
  getClubById,
  createClub,
  deleteClub
};