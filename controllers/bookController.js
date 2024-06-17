const { Book } = require('../models');
const axios = require('axios');

const createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(200).json(newBook);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createBook,
  getBooks
};
