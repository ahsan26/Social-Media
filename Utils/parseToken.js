const JWT = require('jsonwebtoken');

module.exports = async function (token) {
    return await JWT.decode(token);
};