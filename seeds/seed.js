const seedUsers = require('./userSeedsuserSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const sequelize = require('../connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedPosts();

    await seedComments();

    process.exit(0);
};

seedAll();
