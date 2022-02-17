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

    res.redirect(`/pug/result?product=${req.body}`) // ---> Me tira undefined, asi que le saqué el .name para evitar unn poco el error.
});

router.get("/result", (req, res) => res.render("result", { product: req.query.product }))

module.exports = router;