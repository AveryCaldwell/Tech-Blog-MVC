// const router = require('express').Router();

const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// const userRoutes = require('./api/userRoutes.js');
// const postRoutes = require('./postRoutes.js');
// const commentRoutes = require('./api/commentRoutes.js');

// router.use('/api/users', userRoutes);
// router.use('/api/comments', commentRoutes);
// router.use('/api/posts', postRoutes);

router.get('/showsessions', (req, res) => {
    res.json(req.session);
});
module.exports = router;
