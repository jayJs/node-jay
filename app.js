
var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , Kaiseki = require('kaiseki')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , port = process.env.PORT || 5000;


app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'asfgsdsfgfdsefrdrggsagofgslghdlvfh6958767gfsfa' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('connect-livereload')());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  var hourMs = 1000*60*60;
  app.use(express.static(__dirname + '/public', { maxAge: hourMs }));
  app.use(express.directory(__dirname + '/public'));
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
});

// demo account for J @ parse.com
var kaiseki_app_id = "6qpUJ9soNnRiLQLYnEU2dnY6z1qS98bZrsdl1Tcr";
var kaiseki_rest_api_key = "PJ8sMJzoIqndboAoYOodJHYUglB65NKgW4Kg56oI";
var kaiseki = new Kaiseki(kaiseki_app_id, kaiseki_rest_api_key);
// usage: https://github.com/shiki/kaiseki

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});


/* PASSPORT */

// demo account for Jay, works at localhost:5000
var FACEBOOK_APP_ID = "756437764450452";
var FACEBOOK_APP_SECRET = "3fcc01cbe7631a706a851aa4c7b4e745";



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "/auth/facebook/callback",
  scope: ['email']
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's Facebook profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Facebook account with a user record in your database,
    // and return that user instead.
    //console.log(profile._json);

    var userInfo = {
      username: profile._json.name,
      password: 'askjf?lkdsf*Õa5678sdfsa)fds8a6f086€%&/()',
      link: profile._json.link,
      locale: profile._json.locale,
      timezone: profile._json.timezone,
      verified: profile._json.verified,
      fbId: profile._json.id,
      firstName: profile._json.first_name,
      lastName: profile._json.last_name,
      name: profile._json.name,
      gender: profile._json.gender,
      email: profile._json.email
    };

    kaiseki.createUser(userInfo, function(err, res, body, success) {
      console.log('user created with session token = ', body.sessionToken);
      console.log('object id = ', body.objectId);
    });

    return done(null, profile);
  });
}
));

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback

app.get('/auth/facebook',
passport.authenticate('facebook'),
function(req, res){
  // The request will be redirected to Facebook for authentication, so this
  // function will not be called.
});

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback',
passport.authenticate('facebook', {
  failureRedirect: '/'
}),
function(req, res) {
  res.redirect('/');
});


app.get('/api/', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { cl("is authendicated"); return next(); }
  res.redirect('/')
}


server.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
