const express = require('express');
const router = express();
const { send } = require('../Controllers/messages');
const ValidateToken = require('../Utils/validateToken');


router.route('/').post(ValidateToken, send);

module.exports = router;