

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var model = require('./model/model');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
//strategie de connection avec passport
passport.use(new LocalStrategy(
  //fonction de retour de la base de donnees
  function(username, password, done) {
    //a commenter lors de l'assemblage
    model.users.connect(username,password,function(json) {
      //si l'user n'existe pas on renvoie une erreur
      if(json.status == 0){
        return done(null,false, json.error);
      }
      //sinon on retourne l'user
      return done(null, json.user);
    });
  }
));

//init passport
module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
}
