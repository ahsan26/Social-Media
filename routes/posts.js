const express = require('express');
const router = express.Router();
const { post, fetchPosts } = require('../Controllers/posts');
const ValidateToken = require('../Utils/validateToken');

router.route('/').post(ValidateToken, post);
router.route('/').get(ValidateToken, fetchPosts);

module.exports = router;