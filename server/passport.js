

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
  function(email, password, done) {
    //a commenter lors de l'assemblage
    return done(null,{
        name: email,
        mail: 'j@f.r'
      });
    model.connect(email,password,function(json) {
      //si l'user n'existe pas on renvoie une erreur
      if(json.statut == 0){
        done(null,false, { message: json.error })
      }
      //sinon on retourne l'user
      return done(null, json.json_user);
    });
  }
));

//init passport
module.exports = function(app){
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
}
