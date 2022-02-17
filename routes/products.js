const express = require('express');
const path = require('path');
const { Router } = express;
const upload = require('../middlewares/multerUpload')

const router = Router();

const products = require('../database/products.json');

// Returns destructured id of the parameters requested.
const getParamsId = (req) => {
    ({ id } = req.params)
    return req.params
};

// Returns a specific product.
const getProduct = () => {
    return products.find(prod => prod.id == id);
};

//GET products
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/products.html"));
});

//GET products
router.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/form.html"));
});

//GET products/id
router.get("/:id", (req, res) => {
    getParamsId(req);

    !getProduct() ? res.status(404).send({ error: "Product not found." }) : res.send(getProduct());
});

//POST products
router.post("/add", upload.single("image"), (req, res) => {
    const { id, name, type, price, thumbnail } = req.body;

    products.push({
        id,
        name,
        type,
        price,
        thumbnail
    })
    
    res.redirect("/products");
});

//PUT/PATCH movies/id
router.put("/:id", (req, res) => {
    getParamsId(req);

    !getProduct() ? res.status(404).send({ error: "Product not found." }) : res.send(getProduct());

    const { name } = req.body

    getProduct().name = name;
    res.sendStatus(200);
});

//DELETE id
router.delete("/:id", (req, res) => {
    getParamsId(req);
    !getProduct() ? res.status(404).send({ error: "Product not found." }) : res.send(getProduct());
    
    const index = products.indexOf(getProduct());
    products.splice(index, 1);

    res.sendStatus(200);
});


module.exports = router;