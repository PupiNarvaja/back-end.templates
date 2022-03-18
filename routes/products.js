const express = require('express');
// const path = require('path');
const { Router } = express;
const Controller = require('../controllers/controller')
// const upload = require('../middlewares/multerUpload')

const router = Router();

// Returns destructured id of the parameters requested.
// const getParamsId = (req) => {
//     ({ id } = req.params)
//     return req.params
// };

// Returns a specific product.
// const getProduct = () => {
//     return products.find(prod => prod.id == id);
// };

//GET products
router.get("/", Controller.getAllProducts);

//GET products/id
router.get("/:id", Controller.getProductById);

//POST new products
router.post("/", Controller.newProduct);

//PUT/PATCH products/id
router.put("/:id", Controller.updateProductById);

//DELETE id
router.delete("/:id", Controller.deleteProduct);

module.exports = router;