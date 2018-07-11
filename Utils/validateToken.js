const parseToken = require('./parseToken');

module.exports = async function (req, res, next) {
    let token = req.headers['authorization'];
    let decoded = await parseToken(token);
    if (decoded) {
        req.userId = decoded.userId;
        next();
    } else next("Unauthorized");
}