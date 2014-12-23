
var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , Kaiseki = require('kaiseki')
  , port = process.env.PORT || 5000;

app.use(require('connect-livereload')());
app.use(express.logger('dev'));
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendfile('./public/index.html');
});

// demo account for J @ parse.com
var kaiseki_app_id = "6qpUJ9soNnRiLQLYnEU2dnY6z1qS98bZrsdl1Tcr";
var kaiseki_rest_api_key = "PJ8sMJzoIqndboAoYOodJHYUglB65NKgW4Kg56oI";
var kaiseki = new Kaiseki(kaiseki_app_id, kaiseki_rest_api_key);
// usage: https://github.com/shiki/kaiseki

server.listen(port, function(){
  console.log('Express server listening on port ' + port);
});
