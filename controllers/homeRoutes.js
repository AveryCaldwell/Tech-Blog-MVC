const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts
// router.get('/', (req, res) => {
//     Post.findAll({
//         attributes: ['id', 'title', 'created_at', 'content'],
//         include: [
//             {
//                 model: Comment,
//                 attributes: [
//                     'id',
//                     'comment_text',
//                     'post_id',
//                     'user_id',
//                     'created_at',
//                 ],
//                 include: {
//                     model: User,
//                     attributes: ['username'],
//                 },
//             },
//             {
//                 model: User,
//                 attributes: ['username'],
//             },
//         ],
//     })
//         .then((dbPostData) => {
//             const posts = dbPostData.map((post) => post.get({ plain: true }));
//             res.render('homepage', {
//                 posts,
//                 loggedIn: req.session.username,
//             });
//         })
//         .catch((err) => {
//             res.status(500).json(err);
//         });
// });

// // If the user is already logged in, redirect the request to another route
// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/');
//         return;
//     }
//     res.render('login');
// });

// // render signup page
// router.get('/signup', (req, res) => {
//     res.render('signup');
// });
// //GET one comment
// router.get('/posts-comments', (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id,
//         },
//         attributes: ['id', 'content', 'title', 'created_at'],
//         include: [
//             {
//                 model: Comment,
//                 attributes: [
//                     'id',
//                     'comment_text',
//                     'post_id',
//                     'user_id',
//                     'created_at',
//                 ],
//                 include: {
//                     model: User,
//                     attributes: ['username'],
//                 },
//             },
//             {
//                 model: User,
//                 attributes: ['username'],
//             },
//         ],
//     })
//         .then((dbPostData) => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }
//             const post = dbPostData.get({ plain: true });
//             res.render('posts-comments', {
//                 post,
//                 logged_in: req.session.logged_in,
//                 username: req.session.username,
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// //GET post by id
// router.get('/post/:id', (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id,
//         },
//         attributes: ['id', 'content', 'title', 'created_at'],
//         include: [
//             {
//                 model: Comment,
//                 attributes: [
//                     'id',
//                     'comment_text',
//                     'post_id',
//                     'user_id',
//                     'created_at',
//                 ],
//                 include: {
//                     model: User,
//                     attributes: ['username'],
//                 },
//             },
//             {
//                 model: User,
//                 attributes: ['username'],
//             },
//         ],
//     })
//         .then((dbPostData) => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }
//             const post = dbPostData.get({ plain: true });
//             res.render('single-post', {
//                 post,
//                 logged_in: req.session.logged_in,
//                 username: req.session.username,
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });
//  =======================new=================//

// Render Homepage
router.get('/', async (req, res) => {
    try {
        // From the Post table, include the following
        const postData = await Post.findAll({
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
                    // Order the posts from most recent to least
                    order: [['created_at', 'DESC']],

                    // From the User table, include the post creator's user name
                    // From the Comment table, include all comments
                    include: { model: User, attributes: ['username'] },
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
        });

        // Serialize data so the template can read it
        // Create an array for the posts
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass the posts into the homepage template
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//LOGIN
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

//SIGNUP
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//get POST by id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'content', 'title', 'created_at'],
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
                    include: { model: User, attributes: ['username'] },
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
                },
            ],
        });

        // If no post by that id exists, return an error
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        // Serialize the post data
        const post = postData.get({ plain: true });

        //insert data into template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
