const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({});
        if (commentData.length === 0) {
            res.status(404).json({
                message: 'Comment field cannot be left blank. :( ',
            });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET Comment by id
// router.get('/:id', async (req, res) => {
//     try {
//         const commentData = await Comment.findOne({
//             where: {
//                 id: req.params.id,
//             },
//          );
//          if (commentData.length === 0) {
//             res.status(404).json({
//                 message: 'There is no comment with ${req.params.id} id.',
//             });
//             return;
//         };
//         res.status(200).json(commentData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Create Comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body, // spreader
            // title: req.body.title,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update Comment by id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update(
            {
                comment_text: req.body.comment_text,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        if (!updateComment) {
            res.status(404).json({ message: 'No Comment found with this id' });
            return;
        }
        res.status(200).json(updateComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete Comment by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                //  user_id: req.session.user_id,
            },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No Comment found with this id' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
