var model = require('../model/model');

module.exports = function(app){
    app.get('/get_decks', function(req, res){
        if (req.user) {
            model.decks.get_decks(req.user.id_user, function(json){
                res.json(json);
            });
        } else {
            res.json({error: "Il faut être connecté pour faire cette action"})
        }
    });
};