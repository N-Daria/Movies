const allRouters = require('express').Router();

const { authorization } = require('../middlewares/authorization');
const { userRouters } = require('./user');
const { moviesRouters } = require('./movies');
const { signupRouter } = require('./signup');
const { signinRouter } = require('./signin');
const { signoutRouter } = require('./signout');
const { undefinedPage } = require('../controllers/undefinedPage');

allRouters.use('/movies', authorization, moviesRouters);
allRouters.use('/users', authorization, userRouters);
allRouters.use('/signup', signupRouter);
allRouters.use('/signin', signinRouter);
allRouters.use('/signout', signoutRouter);
allRouters.use('*', authorization, undefinedPage);

module.exports = { allRouters };
