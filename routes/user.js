const express = require('express');
const router = express.Router();
const { signUp, signIn, getFriends } = require("../Controllers/user");
const ValidateToken = require('../Utils/validateToken');

router.route('/signUp').post(signUp);
router.route('/signIn').post(signIn);
router.route('/friendss').get(ValidateToken, getFriends);


module.exports = router;