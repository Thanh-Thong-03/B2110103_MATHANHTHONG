const express = require('express');
const staff = require('../controllers/staff.controller.js');

const router = express.Router();

router.route("/")
    .get(staff.findAll)
    .post(staff.create);

router.route("/byname")
    .get(staff.findByName);
    
router.route("/:id")
    .get(staff.findbyId)
    .delete(staff.delete);

module.exports = router;