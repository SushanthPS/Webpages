const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


//1) first we need to connect express to mongodb
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/web10", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
}

//================================================================================
//================================================================================

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    age: Number
}, {
    versionKey: false
});

const User = mongoose.model("user", userSchema);

//================================================================================
//================================================================================

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    tagIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tags",
        required: true
    }]
}, {
    versionKey: false,
    timestamps: true
})

const Post = mongoose.model("post", postSchema);

//================================================================================
//================================================================================

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

const Comment = mongoose.model("comments", commentSchema);

//================================================================================
//================================================================================

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

const Tag = mongoose.model("tags", tagSchema);


//================================================================================
//CRUD operations for User

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

//================================================================================
//CRUD operations for Post

app.post("/posts", async (req, res) => {
    try {
        const x = await Post.create(req.body);
        return res.status(201).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.get("/posts", async (req, res) => {
    try {
        //populate helps get us relational database info too
        const x = await Post.find().populate("userId").populate("tagIds").lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.get("/posts/:id", async (req, res) => {
    try {
        const x = await Post.findById(req.params.id).lean().exec();
        return res.status(200).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.patch("/posts/:id", async (req, res) => {
    try {
        const x = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean();
        return res.status(205).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.delete("/posts/:id", async (req, res) => {
    try {
        const x = await Post.findByIdAndDelete(req.params.id).lean();
        return res.status(200).json({
            post: x
        })
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

//================================================================================
//CRUD operations for Comments

app.post("/comments", async (req, res) => {
    try {
        const x = await Comment.create(req.body);
        return res.status(201).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.get("/comments", async (req, res) => {
    try {
        const x = await Comment.find().lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.get("/comments/:id", async (req, res) => {
    try {
        const x = await Comment.findById(req.params.id).lean().exec();
        return res.status(200).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.patch("/comments/:id", async (req, res) => {
    try {
        const x = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean();
        return res.status(205).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.delete("/comments/:id", async (req, res) => {
    try {
        const x = await Comment.findByIdAndDelete(req.params.id).lean();
        return res.status(200).json({
            comment: x
        })
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


//================================================================================
//CRUD operations for Tags

app.post("/tags", async (req, res) => {
    try {
        const x = await Tag.create(req.body);
        return res.status(201).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.get("/tags", async (req, res) => {
    try {
        const x = await Tag.find().lean().exec();
        return res.send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.get("/tags/:id", async (req, res) => {
    try {
        const x = await Tag.findById(req.params.id).lean().exec();
        return res.status(200).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.patch("/tags/:id", async (req, res) => {
    try {
        const x = await Tag.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean();
        return res.status(205).send(x);
    } catch (err) {
        return res.status(400).send(err.message);
    }
})


app.delete("/tags/:id", async (req, res) => {
    try {
        const x = await Tag.findByIdAndDelete(req.params.id).lean();
        return res.status(200).json({
            tag: x
        })
    } catch (err) {
        return res.status(400).send(err.message);
    }
})

//================================================================================
//================================================================================


app.listen(2345, async () => {
    await connect()
    console.log("Listening on port 2345");
})