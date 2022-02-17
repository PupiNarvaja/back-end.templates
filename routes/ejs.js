const path = require("path");
const { Router } = require("express");

const clase = require("../models/clase");

const router = new Router();

const claseModel = new clase();

router.get("/", async (req, res) => {
    const products = await claseModel.getAll();
    res.render("index", { products })
});

router.get("/add", (req, res) => res.render("new"));

router.post("/add", async (req, res) => {
    console.log(req.body)
    await claseModel.add(req.body)

    res.redirect(`/ejs/result?product=${req.body}`)
});

router.get("/result", (req, res) => res.render("result", { product: req.query.product }))

module.exports = router;