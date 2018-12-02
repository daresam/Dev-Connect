const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../model/Post');
const Profile = require('../../model/Post');
const validatePostInput = require('../../validation/post/post');

// @route /api/posts
// @desc all post 
// @access public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            nopostfound: 'No Posts Information Found'
        }))
});
// @route /api/posts/:id
// @desc get a post 
// @access private
router.get('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findOne({
            _id: req.params.id
        })
        .then(post => {
            if (post) res.json(post);
            if (!post) res.json({
                nopostfound: 'No Post Information Found'
            });
        })
        .catch(err => res.status(404).json({
            nopostfound: 'No Post Information Found'
        }))
});

// @route /api/posts
// @desc create post 
// @access private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Validation
    const {
        errors,
        isValid
    } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    });

    newPost.save().then(post => res.json(post));
});
// @route /api/posts
// @desc update post 
// @access private
router.put('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // Validation
    const {
        errors,
        isValid
    } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const postField = {
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    };

    Post.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: postField
        }, {
            new: true
        }).then(post => res.json(post))
        .catch(err => res.json(err));

});

// @route /api/posts/:id
// @desc delete post
// @access private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // check for post owner
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({
                    notauthorized: 'User not authorize'
                })
            }
            //  Delete Post
            post.remove().then(() => res.json({
                success: true
            }));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'No post found'
        }));
});
// Post @route /api/posts/like/:id
// @desc like post
// @access private
router.post('/like/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({
                    alreadyliked: 'User already like this post'
                })
            }
            // add user to likes array
            post.likes.unshift({
                user: req.user.id
            });

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'No post found'
        }));
});

// Post @route /api/posts/unlike/:id
// @desc unlike post
// @access private
router.post('/unlike/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({
                    notliked: 'You have not like this post'
                });
            }
            // removed index
            const removedIndex = post.likes.map(like => like.user).indexOf(req.user.id);

            // remove user from likes array
            post.likes.splice(removedIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
            postnotfound: 'No post found'
        }));
});

// Post @route /api/posts/comment/:id
// @desc add comment to post
// @access private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id,
            }
            // Add to comments array
            post.comments.unshift(newComment);
            // Save
            post.save().then(post => res.json(post));
        }).catch(err => res.status(404).json({
            postnotfound: 'No post found'
        }))
});

// Delete @route /api/posts/comment/:id/:comment_id
// @desc remove comment from post
// @access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({
                    commentnotfound: 'No Comment Found'
                });
            }
            // removedd index
            const removedIndex = post.comments.map(comment => comment._id).indexOf(req.params.comment_id);

            // Remove comment from array
            post.comments.splice(removedIndex, 1);

            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json(err))
    // .catch(err => res.status(404).json({
    //     postnotfound: 'No post found'
    // }))
});

module.exports = router;