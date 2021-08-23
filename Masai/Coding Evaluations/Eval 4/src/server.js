const express = require('express'); //importing express
const app = express();
app.use(express.json()) //middleware

//importing server config
const connect = require("./configs/db");


const productController = require('./controllers/product.controller'); //importing controller
app.use("/products", productController); //calling controller when products address is reached



//listening to server
const PORT = 2345;
app.listen(PORT, async () => {
    try {
        await connect();
        console.log("Listening to port ", PORT);
    } catch (err) {
        console.log(err);
    }
})