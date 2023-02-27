const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// GET all posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'content', 'date_created'],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'date_created',
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
        where: {
            user_id: req.session.user_id,
        },
    })
        .then((dbPostData) => {
            // `plain: true` turns off medadata; serialize
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            res.render('dashboard', {
                posts,
                loggedIn: true,
                username: req.session.username,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// EDIT one post
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'content', 'date_created'],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'date_created',
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
        ],
    })
        .then((dbPostData) => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            // serialize the data
            const post = dbPostData.get({ plain: true });
            console.log('sending ' + req.session.username);
            res.render('editPost', {
                post,
                loggedIn: true,
                username: req.session.username,
                id: req.params.id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// NEW post
router.get('/new', withAuth, (req, res) => {
    res.render('addPost', { loggedIn: true, username: req.session.username });
});

module.exports = router;
