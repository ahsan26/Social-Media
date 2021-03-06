const express = require('express');
const router = express();
const { send, messages } = require('../Controllers/messages');
const ValidateToken = require('../Utils/validateToken');

module.exports = (socket, users) => {
    router.route('/').post(ValidateToken, (req, res, next) => { send(req, res, next, socket, users) });
    router.route('/').get(ValidateToken, messages);
    return router;
};