
var express = require('express')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , config = require(__dirname + '/config')
  , Kaiseki = require('kaiseki')
  , kaiseki = new Kaiseki(config.kaiseki.appId, config.kaiseki.restApiKey)
  , Jay = require('jay-npm')
  , J = Jay
  , FB = require('fb')
  , jwt = require('jwt-simple')
  , port = process.env.PORT || 5000;

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

app.post('/auth/fb', function(req, res) {
  Jay.logIn(req, res, function(data){
    res.json(data);
  })
})

// Get content
app.get('/api/j', function(req, res){
  Jay.get(req, res, function(data){
    res.json(data);
  });
});

// Post content
app.post('/api/j', J.ensureAuthenticated, function(req, res){
  Jay.post(req, res, function(data){
    res.json(data);
  })
});
/*
app.put('/api', ensureAuthenticated, function(req, res){
  Jay.put(req, res)
});
*/

// Send the index.html
app.get('/', function(req, res){
  res.sendfile('./public/index.html');
});

server.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
