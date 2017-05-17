var model = require('../model/model');

module.exports = function(app){
    app.get('/get_decks', function(req, res){
        if (req.user) {
            model.decks.get_decks(req.user.id_user, function(json){
                if(json.status == 1){
                    res.json(json);
                } else {
                    res.json({status: 1 , error: null, id_decks: [] , name_decks: []});
                }
            });
        } else {
            res.json({status: 0 , error: "Il faut être connecté pour faire cette action"})
        }
    });
};