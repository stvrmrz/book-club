const { Book, Club } = require('../models');
const axios = require('axios');

// Function to search for books
const searchBooks = async (req, res) => {
  try {
    const query = req.query.query; // Use query string parameter
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const books = response.data.items.map(item => ({
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
      description: item.volumeInfo.description || 'No description available'
    }));
    res.render('pages/searchResults', { title: 'Search Results', books });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(200).json(newBook);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBooksByClub = async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { clubId: req.params.clubId },
      include: [Club]
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  searchBooks,
  createBook,
  getBooksByClub
};
