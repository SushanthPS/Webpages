const express = require("express");
const Book = require("../models/book.model");
const router = express.Router();

const Section = require('../models/section.model');

const generic = require('./generic.controller');


router.get("/", generic(Section).getAll);
router.get("/:id", generic(Section).getOne);
router.post("/", generic(Section).post);
router.patch("/:id", generic(Section).updateOne);
router.delete("/:id", generic(Section).deleteOne);

router.get("/:id/books", async (req, res) => {
	try {
		const books = await Book.find({ sectionId: req.params.id }).lean().exec();
		return res.status(200).json({ books });
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

router.get("/:id/notChecked", async (req, res) => {
	try {
		const books = await Book.find({ sectionId: req.params.id, checked: false }).lean().exec();
		return res.status(200).json({ books });
	} catch (err) {
		return res.status(400).json({ err: err.message });
	}
})

module.exports = router;