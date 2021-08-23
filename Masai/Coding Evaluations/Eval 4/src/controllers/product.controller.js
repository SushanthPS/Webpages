const express = require('express');
const router = express.Router()
const Product = require("../models/product.model") //importing products model


//adding a product
router.post("/", async (req, res) => {
    try {
        const x = await Product.create(req.body);
        return res.send(x);
    } catch (err) {
        return res.send(err.message);
    }

})


//deleting a product
router.delete("/:id", async (req, res) => {
    try {
        const x = await Product.findByIdAndDelete(req.params.id);
        return res.send(x);
    } catch (err) {
        return res.send(err.message);
    }
})


//getting all products
router.get("/", async (req, res) => {
    try {
        const x = await Product.find().lean().exec();
        return res.send(x);
    } catch (err) {
        return res.send(err.message);
    }
})

//get all products which cost more than 500
router.get("/500", async (req, res) => {
    try {
        const x = await Product.find({
            cost: {
                $gt: 500
            }
        }).lean().exec();
        return res.send(x);
    } catch (err) {
        return res.send(err.message);
    }
})


//find all products having 3 or more colors
router.get("/3colors", async (req, res) => {
    try {
        const x = await Product.find().lean().exec();
        const result = x.filter((el) => {
            return el.colors.length > 3
        })
        return res.send(result);
    } catch (err) {
        return res.send(err.message);
    }
})


//find all the products which have atleast 1 colour that matches
router.get("/color/:name", async (req, res) => {
    try {
        const x = await Product.find().lean().exec();
        const result = x.filter((el) => {
            return el.colors.includes(req.params.name)
        })
        return res.send(result);
    } catch (err) {
        return res.send(err.message);
    }
})


//find the product which has the most colours.
router.get("/mostColors", async (req, res) => {
    try {
        let maxLength = 0;
        const x = await Product.find().lean().exec();
        let item;
        x.forEach((el) => {
            if (el.colors.length > maxLength) {
                maxLength = el.colors.length;
                item = el;
            }
        })
        return res.send(item);
    } catch (err) {
        return res.send(err.message);
    }
})


//find the products which can be used by men and women.
router.get("/mw", async (req, res) => {
    try {
        const x = await Product.find({
            usedBy: "men & women"
        }).lean().exec();
        return res.send(x);
    } catch (err) {
        return res.send(err.message);
    }
})


//find the total number of products on the site 
router.get("/totalProducts", async (req, res) => {
    try {
        let total = 0;
        const x = await Product.find().lean().exec();
        x.forEach((el) => {
            total += el.colors.length;
        })
        return res.send({
            "Total Products": total
        });
    } catch (err) {
        return res.send(err.message);
    }
})


//find the colour which has the most products.
router.get("/highestcolor", async (req, res) => {
    try {
        let obj = {};
        let max = 0;
        let maxColor;
        const x = await Product.find().lean().exec();
        x.forEach(({
            colors
        }) => {
            colors.forEach((el) => {
                if (obj[el] == undefined)
                    obj[el] = 1;
                else
                    obj[el]++;
                if (obj[el] > max) {
                    max = obj[el];
                    maxColor = el;
                }
            })

        })
        return res.send(maxColor + " color has the most products");
    } catch (err) {
        return res.send(err.message);
    }
})


module.exports = router