const Post = require('../Models/posts');

module.exports = {
    post: async function (req, res) {
        const newPost = await new Post({ description: req.body.desc, img: req.body.img, userId: req.userId });
        newPost.save(function (err) {
            if (err) return res.status(400).json({ status: false, err });
            res.status(200).json({ status: !false });
        });
    },
    fetchPosts: async function (req, res) {
        Post.find().select('description img').populate('userId', 'name profilePic').exec(function (err, data) {
            if (err) return res.status(400).json({ status: false, err });
            res.status(200).json({ status: true, posts: data });
        })
    }
};