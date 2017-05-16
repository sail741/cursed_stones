var model = require('../model/model');

module.exports = function (app) {
    app.get('/classement', function (req, res) {
        model.users.classement(function (json) {
            res.json(json);
        });
    });
    app.get('/country', function(req,res){

    });
};