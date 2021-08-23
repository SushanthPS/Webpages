const express = require('express');
const app = express();

// Server config
const connect = require('./configs/db');

// Getting routes
const authorController = require("./controllers/author.controller");
const bookController = require("./controllers/book.controller");
const sectionController = require('./controllers/section.controller');

app.use(express.json());

app.use("/authors", authorController);
app.use("/books", bookController);
app.use("/sections", sectionController);


const PORT = 8000;
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`Listening to port: ${PORT}`);
  } catch (err) {
    console.log('Database not connected');
  }
});
