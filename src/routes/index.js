const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');
const userRouter = require('./user');

const userController = require('../app/controllers/UserController');


function route(app) {

    // use path news, và truyền vào router newsRouter đã import 
    app.use('/user', userRouter);
    app.use('/me', meRouter);
    app.use('/courses', courseRouter);
    app.use('/news', newsRouter);
    app.use('/', siteRouter);
    
}

module.exports = route;

