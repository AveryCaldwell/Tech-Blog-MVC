const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// connects to login functions in utilities
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

// GET all users; api/user
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [Post, Comment],
            // attributes: { exclude: ['password'] },
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET user by id; /api/user/1
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.params.id },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'date_created'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'date_created'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
                {
                    model: Post,
                    attributes: ['title'],
                },
            ],
        });
        console.log(userData);
        if (!userData) {
            res.status(404).json({
                message: `No such user id ${req.params.id}`,
            });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// singup user ('/api/user)
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body, { individualHooks: true });

        req.session.save(() => {
            req.session.user_id = userData.id;
            // req.session.username = userData.username;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
// login ('/api/user/login')
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        });
        // if there is no user data
        if (!userData) {
            res.status(400).json({
                message: 'Incorrect email or password, please try again',
            });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        // if the password is NOT valid
        if (!validPassword) {
            res.status(400).json({
                message: 'Incorrect email or password, please try again',
            });
            return;
        }
        // Saves user info as logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            // req.session.username = userData.username;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});
// logout user ('/api/user/logout')
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
// Update user by id
router.put('/:id', (req, res) => {
    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id,
        },
    })
        .then((updateUser) => {
            if (!updateUser) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(updateUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
// Delete user by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((removeUser) => {
            if (!removeUser) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(removeUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
