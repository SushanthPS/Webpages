const express = require('express');
const router = express.Router();

const Author = require('../models/author.model');
const Book = require('../models/book.model');

const generic = require('./generic.controller');

router.get('/', generic(Author).getAll);
router.get('/:id', generic(Author).getOne);
router.post('/', generic(Author).post);
router.patch('/:id', generic(Author).updateOne);
router.delete('/:id', generic(Author).deleteOne);

router.get('/:id/books', async (req, res) => {
  try {
    const books = await Book.find({ authorId: req.params.id }).lean().exec();
    return res.status(200).json({ books });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

module.exports = router;
