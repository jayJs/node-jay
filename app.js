
var express = require('express')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , Kaiseki = require('kaiseki')
//  , passport = require('passport')
//  , FacebookStrategy = require('passport-facebook').Strategy
  , Jay = require('jay-npm')
  , config = require(__dirname + '/config')
  , port = process.env.PORT || 5000;


app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'Please_change_me_now' }));
  //app.use(passport.initialize());
  //app.use(passport.session());
  app.use(app.router);
  app.use(require('connect-livereload')());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  var hourMs = 1000*60*60;
  app.use(express.static(__dirname + '/public', { maxAge: hourMs }));
  app.use(express.directory(__dirname + '/public'));
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
});


function handler (request, response) {
	/*if (request.url == '/') {
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.write('<script type="text/javascript" charset="utf-8" src="http://' + config.connect.host + ':' + config.connect.port + '/libs/jquery-1.11.2.min.js"></script>');
		response.write('<script type="text/javascript" charset="utf-8" src="http://' + config.connect.host + ':' + config.connect.port + '/src/fb.js"></script>');
		response.write('<script type="text/javascript" charset="utf-8">var facebook_client_id="' + config.facebook.client_id + '"</script>');
    response.write("jajajajaja")
		response.write('<fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>');
		response.end();
	}*/

  if (request.url == '/access_endpoint') {
    //
  }
}


/*

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.clientSecret,
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

*/


app.post('/access_endpoint', function(request, response) {

  var data = '';
  request.on('data', function(chunk) {
      data += chunk.toString('utf8');
      //console.log(chunk)
  });

  //console.log(data)

  request.on('end', function() {
    response.writeHead(200, {"Content-Type": "application/json"});


    var ajax_object = {};
    try { ajax_object = JSON.parse(data) } catch(err) {
      response.end(JSON.stringify({ error: true, type: 'data', message: 'data could not be parsed'}));
      return;
    };

    var short_lived_access_token = ajax_object.access_token;
    var type = ajax_object.type;

    if (type == "long") {
      me(short_lived_access_token);
    }

    if (type == "short") {
      var optionsget = {
          host : 'graph.facebook.com',
          port : 443,
          path : '/oauth/access_token?grant_type=fb_exchange_token&client_id=' + config.facebook.client_id + '&client_secret=' + config.facebook.client_secret + '&redirect_uri=http://'+ config.app.host +'/&fb_exchange_token=' + short_lived_access_token,
          method : 'GET' // do GET
        };

      var reqGet = https.request(optionsget, function(res) {
        if (res.statusCode != 200) {
          response.end(JSON.stringify({ error: true, type: 'data', message: 'res.statusCode != 200'}));
        };

        res.on('data', function(d) {
          var decoded_data = d.toString('utf8');
          var access_string = decoded_data;
          try {
            var a = access_string.split('access_token')[1]
            var b = a.split('&expires')[0]
            long_lived_access_token = b.split('=')[1];

            me(long_lived_access_token);
          } catch (err) { return };
        });
      });

      reqGet.end();
      reqGet.on('error', function(e) {
        console.error(e);
      });
    }
  });

  function me(long_lived_access_token) {
    FB.api('me', { fields: ['id', 'first_name', 'email'], access_token: long_lived_access_token}, function (res) {
      if (!res.id) {
          response.end(JSON.stringify({ error: true, message: 'could not get res.id'}) );
      }

      if (!res.first_name) {
          response.end(JSON.stringify({ error: true, message: 'could not get res.first_name'}) );
      }

      if (!res.email) {
          res.email = '';
      }

      User.findOne({id: res.id}, function(err, user_db) {

        // If user does not exist yet
        if (user_db == null) {
          var current_time = Date.now();
          var random_string = String(Math.random()).split('.')[1];

          var user = new User ({
            id: res.id,
            email: res.email,
            username: res.first_name,
            hash: long_lived_access_token,
            registered_time: current_time
          });

          user.save(function (err) {
            if (err) {
              response.end(JSON.stringify({ error: true, type: 'database', message: 'could not save to database'}));
              return
            };

            //success
            return_payload();
          });
        }

        // user exists
        if (user_db) {
          user_db.hash = long_lived_access_token;
          user_db.save();

          return_payload();
        }

        function return_payload() {
          var payload = {};

          payload.id = res.id;
          payload.username = res.first_name;
          payload.email = res.email;
          var secret = config.jwt_simple.secret;
          var token = jwt.encode(payload, secret);

          response.end(JSON.stringify({ error: false, message: 'authenticated', token: token, id: res.id }));
        }
      });
    });
  }
})


// define get();
app.get('/api', function(req, res){
  Jay.get(req, res);
});

// define post()
app.post('/api', function(req, res){
  Jay.post(req, res)
});

// define put();
app.put('/api', function(req, res){
  Jay.put(req, res)
});

app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});



/*
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { cl("is authendicated"); return next(); }
  res.redirect('/')
}
*/

server.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
