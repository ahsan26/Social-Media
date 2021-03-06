const express = require('express');
const router = express.Router();
const { post, fetchPosts, addLike ,addComment,nestedComment} = require('../Controllers/posts');
const ValidateToken = require('../Utils/validateToken');

router.route('/').post(ValidateToken, post);
router.route('/').get(ValidateToken, fetchPosts);
router.route('/like').all(ValidateToken, addLike);
router.route('/comment').post(ValidateToken, addComment);
router.route('/nComment').post(ValidateToken,nestedComment);

module.exports = router;