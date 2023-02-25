const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// // GET all posts
// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             attributes: ['id', 'title', 'content', 'date_created'],
//             order: [['date_created', 'DESC']],
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: Comment,
//                     attributes: [
//                         'id',
//                         'comment_text',
//                         'post_id',
//                         'user_id',
//                         'date_created',
//                     ],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 },
//             ],
//         });
//         res.status(200).json(postData.reverse());
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
// GET post by id
// router.get('/:id', async (req, res) => {
//     try {
//         const postData = await Post.findOne({
//             where: {
//                 id: req.params.id,
//             },
//             attributes: ['id', 'content', 'title', 'date_created'],
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: Comment,
//                     attributes: [
//                         'id',
//                         'comment_text',
//                         'post_id',
//                         'user_id',
//                         'date_created',
//                     ],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 },
//             ],
//         });
//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         res.status(200).json(postData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });
// Create post
router.post('/', withAuth, async (req, res) => {
    // if no user in session, send messsage
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login!' });
    }
    try {
        const newPost = await Post.create({
            ...req.body,
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});
// Update post by id
router.put('/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login!' });
    }
    try {
        const postData = await Post.update(
            req.body,
            // {
            //     title: req.body.title,
            //     content: req.body.content,
            // },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Delete post by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
