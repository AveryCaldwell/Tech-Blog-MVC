const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Render Homepage
router.get('/', async (req, res) => {
    try {
        // From the Post table, include the following
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
        })
            .then((dbPostData) => {
                // `plain: true` turns off medadata; serialize
                const posts = dbPostData.map((post) =>
                    post.get({ plain: true })
                );
                res.render('homepage', {
                    posts,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//LOGIN
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.user) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

//SIGNUP
router.get('/signup', (req, res) => {
    if (req.session.user) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;
