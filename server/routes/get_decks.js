var model = require('../model/model');

module.exports = function(app){
    app.post('/get_decks', function(req, res){
        if (req.user) {
            model.decks.get_decks(req.user.username, function(res){
                res.json(res);
            });
        } else {
            res.json({error: "Il faut être connecté pour faire cette action"})
        }
    });
};