const express = require('express');
const user = require('../controllers/user.controller');

const router = express.Router();

router.route("/")
    .get(user.findAll)
    .post(user.create);

router.route("/byname")
    .get(user.findByName);
    
router.route("/:id")
    .get(user.findbyId)
    .delete(user.delete);

router.route("/login")
    .post(user.login);

router.route("/register")
    .post(user.register);

router.route("/cart/:userId/:productId")
    .post(user.addToCart)
module.exports = router;
