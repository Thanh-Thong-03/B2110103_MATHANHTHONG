const express = require('express');
const product = require('../controllers/product.controller');

const router = express.Router();

router.route("/")
    .get(product.findAll)
    .post(product.create);

router.route("/type/:type")
    .get(product.findbyType);

router.route("/byname")
    .get(product.findByName);
    
router.route("/:id")
    .get(product.findbyId)
    .put(product.update)
    .delete(product.delete);

router.post("/vd", )

module.exports = router;