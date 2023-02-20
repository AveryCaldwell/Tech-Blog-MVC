const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// GET all posts ('/dashboard)
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            // id from session
            user_id: req.session.user_id,
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at',
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
// EDIT one post ('dashboard/edit/:id')
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'content', 'created_at'],
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
                    'created_at',
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
            res.render('edit-post', {
                post,
                loggedIn: true,
                username: req.session.username,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// NEW post; (/dashboard/new)
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { username: req.session.username });
});

module.exports = router;
