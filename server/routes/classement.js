var model = require('../model/model');

module.exports = function (app) {
    app.get('/classement', function (req, res) {
        model.users.get_classement_world(function (json) {
            res.json(json);
        });
    });
};