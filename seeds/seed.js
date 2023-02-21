const sequelize = require('../connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userSeeds');
const postData = require('./postSeeds');
const commentData = require('./commentSeeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const posts = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });

    const comments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedAll();
