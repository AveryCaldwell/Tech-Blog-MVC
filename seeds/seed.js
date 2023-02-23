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

    // const posts = await Post.bulkCreate(postData, {
    //     individualHooks: true,
    //     returning: true,
    // });

    // const comments = await Comment.bulkCreate(commentData, {
    //     individualHooks: true,
    //     returning: true,
    // });

    // create random user id for posts
    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    // create random user id and post id for comments
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            post_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    process.exit(0);
};

seedDatabase();
