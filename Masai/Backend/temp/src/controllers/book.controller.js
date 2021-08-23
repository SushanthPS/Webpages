const express = require('express');
const router = express.Router();

const Book = require('../models/book.model');

const generic = require('./generic.controller');

router.get('/checked', async (req, res) => {
  try {
    const books = await Book.find({ checked: true }).lean().exec();
    return res.status(200).json({ books: books });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

router.get('/:userId/:sectionId', async (req, res) => {
  try {
		let books = await Book.find({ sectionId: req.params.sectionId }).lean().exec();
		books = books.filter((book) => {
			for (let i = 0; i < book.authorId.length; i++){
				if (book.authorId[i] == `${req.params.userId}`) return true;
			}
		})
    return res.status(200).json({ books });
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
});

router.get('/', generic(Book).getAll);
router.get('/:id', generic(Book).getOne);
router.post('/', generic(Book).post);
router.patch('/:id', generic(Book).updateOne);
router.delete('/:id', generic(Book).deleteOne);

module.exports = router;
