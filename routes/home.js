const express = require('express');
const path = require('path');
const { Router } = express;

const router = Router();

router.get("/", (req, res) => {
    res.render("main");
});

module.exports = router;