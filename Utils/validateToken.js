const JWT = require('jsonwebtoken');

module.exports = async function (next) {
    let token = req.headers['Authorization'];
    let decoded = await JWT.decode(token);
    if (decoded) {
        req.body.userId = decoded.userId;
        next();
    }
    next("Unauthorized");
}