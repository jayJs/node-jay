
var express = require('express')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , Kaiseki = require('kaiseki')
  , Jay = require('jay-npm')
  , J = Jay
  , config = require(__dirname + '/config')
  , FB = require('fb')
  , jwt = require('jwt-simple')
  , port = process.env.PORT || 5000;

  var kaiseki = new Kaiseki(config.kaiseki.appId, config.kaiseki.restApiKey);

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'Please_change_me_now' }));
  app.use(app.router);
  app.use(require('connect-livereload')());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  var hourMs = 1000*60*60;
  app.use(express.static(__dirname + '/public', { maxAge: hourMs }));
  app.use(express.directory(__dirname + '/public'));
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
});

app.post('/access_endpoint', function(request, response) {


  var data = '';
  request.on('data', function(chunk) {
      data += chunk.toString('utf8');
  });

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
          path : '/oauth/access_token?grant_type=fb_exchange_token&client_id=' + config.facebook.clientId + '&client_secret=' + config.facebook.clientSecret + '&redirect_uri=http://'+ config.app.host +'/&fb_exchange_token=' + short_lived_access_token,
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
          } catch (err) {return };
        });
      });

      reqGet.end();
      reqGet.on('error', function(e) {
        console.error(e);
      });
    }
  });

  function me(long_lived_access_token) {
    FB.api('me', { fields: ['id', 'name', 'verified', 'link', 'email'], access_token: long_lived_access_token}, function (res) {

      if (!res.id) {
          response.end(JSON.stringify({ error: true, message: 'could not get res.id'}) );
      }

      // since Kaiseki query where: { fbId: undefined} returns everyone
      if(res.id === undefined) { res.id = false; }

      if (!res.first_name) {
          response.end(JSON.stringify({ error: true, message: 'could not get res.first_name'}) );
      }

      if (!res.email) {
          res.email = '';
      }

      // get the posts from Parse
      var params = {
        where: {
          fbId: res.id
        },
        limit: 1
      }

      kaiseki.getObjects("_User", params, function(err, response, body, success) {
        if(body.length > 0) { //user found
          // jayb also saves has, but we currently not
          //user_db.hash = long_lived_access_token;
          //user_db.save();
          //console.log(body[0].name);
          return_payload();
        } else { // user not found

          var password = makePsw();
          var userInfo = {
            username: res.name,
            password: password, // since Parse.com won't accept new users without passwords
            link: res.link,
            verified: res.verified,
            fbId: res.id,
            name: res.name,
            email: res.email
          };

          kaiseki.createUser(userInfo, function(err, res, body, success) {
            if(success) {
              return_payload();
            }
            console.log('user created with session token = ', body.sessionToken);
            console.log('object id = ', body.objectId);
          });
        }

        function return_payload() {
          var payload = {};

          payload.id = res.id;
          //payload.username = res.first_name;
          payload.username = res.name;
          payload.email = res.email;
          var secret = config.jwtSimple.secret;
          var token = jwt.encode(payload, secret);

          // This should be returned:
          //response.end(JSON.stringify({ error: false, message: 'authenticated', token: token, id: res.id }));
        }
      });
    });
  }
})

function makePsw() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 16; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

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

server.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
