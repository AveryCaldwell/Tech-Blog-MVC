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
                const resObj = { posts };
                // if (req.session.username) {
                // }
                if (req.session.loggedIn) {
                    resObj.loggedIn = true;
                    resObj.username = req.session.username;
                    resObj.uid = req.session.user_id;
                }
                res.render('homepage', resObj);
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
router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'content', 'date_created', 'user_id'],
        include: [
            {
                model: User,
                required: true,
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
    }).then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({
                message: 'No post found with this id',
            });
            return;
        }
        const posts = dbPostData.get({ plain: true });
        Comment.findAll({
            where: {
                post_id: req.params.id,
            },
            attributes: [
                'id',
                'comment_text',
                'user_id',
                'post_id',
                'date_created',
            ],
            include: [
                {
                    model: User,
                    required: true,
                    attributes: ['username'],
                },
            ],
        })
            .then((dbCommentData) => {
                // serialize the data

                const comments = dbCommentData.map((post) =>
                    post.get({ plain: true })
                );
                //const comments = dbPostData.get({ plain: true });
                const resObj = { posts, comments };
                if (req.session.loggedIn) {
                    resObj.loggedIn = true;
                    resObj.username = req.session.username;
                    resObj.uid = req.session.user_id;
                }
                res.render('post', resObj);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    });
});

module.exports = router;
