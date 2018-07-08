const JWT = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    let token = req.headers['authorization'];
    let decoded = await JWT.decode(token);
    if (decoded) {
        req.userId = decoded.userId;
        next();
    } else next("Unauthorized");
}