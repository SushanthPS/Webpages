const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


//1) first we need to connect express to mongodb
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/web10", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}

//2) we need to create a schema
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    age: Number
}, {
    versionKey: false
});


//3) tell mongoose to create collection
const User = mongoose.model("user", userSchema);


app.post("/users", async (req, res) => {
    const user = await User.create(req.body);
    //const newUsers = [...users, req.body];
    return res.send(user);
})

app.get("/users", async (req, res) => {
    const users = await User.find().lean().exec()
    return res.send(users);
})

app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec();
    res.send(user);
})

app.patch("/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.send(user);
})

app.delete("/users/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send("User Deleted");
})


app.listen(2345, async () => {
    await connect()
    console.log("Listening on port 2345");
})