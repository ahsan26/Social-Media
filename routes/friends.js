const express = require('express');
const router = express();
const { findFriend, addFriend } = require('../Controllers/friends');
const ValidateToken = require('../Utils/validateToken');

router.route('/find').get(ValidateToken, findFriend);
router.route('/add').post(ValidateToken, addFriend);

module.exports = router;