const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userSeeds.js');
const postData = require('./postSeeds.js');
const commentData = require('./commentSeeds.js');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    const posts = await Post.bulkCreate(postData, {
        // individualHooks: true,
        // returning: true,
    });
    const comments = await Comment.bulkCreate(commentData, {
        // individualHooks: true,
        // returning: true,
    });

    process.exit(0);
};

seedDatabase();
