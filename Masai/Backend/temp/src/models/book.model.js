const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    authorId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'author',
      required: true,
    },
    sectionId: {
      type: String,
      ref: 'section',
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
