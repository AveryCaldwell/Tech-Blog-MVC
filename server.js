const routes = require('./controllers');
const express = require('express');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const path = require('path');
require('dotenv').config();
const hbs = exphbs.create({ helpers });

// Create a new sequelize store using the express-session package
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure and link a session object with the sequelize store
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};
// // Add express-session and store as Express.js middleware
// app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Add express-session and store as Express.js middleware
app.use(session(sess));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(require('./controllers/'));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
