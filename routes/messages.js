const express = require('express');
const router = express();
const { send, messages } = require('../Controllers/messages');
const ValidateToken = require('../Utils/validateToken');


router.route('/').post(ValidateToken, send);
router.route('/').get(ValidateToken, messages);

module.exports = router;