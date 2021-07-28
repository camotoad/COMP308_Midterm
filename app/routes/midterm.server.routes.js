const student = require('../../app/controllers/midterm.server.controller');

module.exports = function (app){
    var index = require('../controllers/midterm.server.controller');

    app.route('/').get(index.render).post(index.login);
    app.route('/signUp').get(index.render2).post(index.signUp);
    app.route('/add').get(index.renderAdd).post(index.create);
    app.route('/view').get(index.view).post(index.delete);
    app.route('/main').get(index.render3);
}