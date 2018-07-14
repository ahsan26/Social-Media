const Post = require('../Models/posts');
const Comment = require('../Models/comment');

module.exports = {
    post: async function (req, res) {
        const newPost = await new Post({ description: req.body.desc, img: req.body.img, userId: req.userId });
        newPost.save(function (err) {
            if (err) return res.status(400).json({ status: false, err });
            res.status(200).json({ status: !false });
        });
    },
    fetchPosts: async function (req, res) {
        Post.find().select('description img likes').populate('userId', 'name profilePic txt userId').populate({
            path: 'comments', populate: {
                path: 'userId nestedComments',
                select: 'name profilePic txt userId',
                populate: {
                    path: 'userId',
                    select: 'name profilePic'
                }
            }
        }).populate({ path: 'likes', select: 'name profilePic' }).exec(function (err, data) {
            if (err) return res.status(400).json({ status: false, err });
            res.status(200).json({ status: true, posts: data });
        })
    },
    addLike: async function (req, res) {
        // Post.findByIdAndUpdate(req.query.id, { $inc: { likes: +1 } }, function (err) {
        Post.findByIdAndUpdate(req.query.id, { $push: { likes: req.userId } }, function (err) {
            if (err) return res.status(400).json({ status: false, err });
            return res.status(200).json({ status: true });
        })
    },
    addComment: async function (req, res) {
        const { txt, postId } = req.body;
        const newComment = new Comment({ txt, postId, userId: req.userId });
        newComment.save(function (err, comment) {
            if (err) return res.status(400).json({ status: false, err });
            Post.findByIdAndUpdate(comment.postId, { $push: { comments: comment._id } }, function (err2, post) {
                if (err2) return res.status(400).json({ status: false, err });
                res.status(200).json({ status: true });
            });
        });
    },
    nestedComment: async function (req, res) {
        const newNComment = new Comment({ txt: req.body.txt, userId: req.userId, nestedComment: true, postId: req.body.postId });
        newNComment.save(function (err, data) {
            Comment.findByIdAndUpdate(req.body.commentId, { $push: { nestedComments: data._id } }, function (err) {
                if (err) return res.status(400).json({ status: false, err });
                res.status(200).json({ status: true });
            });
        });
    }
};