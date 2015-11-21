var config = {};

// Server address and port
config.app = {};
config.app.domain = 'localhost';
config.app.port =  process.env.PORT || 5000;
config.app.host = 'localhost:5000';

// Facebook credidentials
config.facebook = {};
config.facebook.clientId = process.env.FBID;
config.facebook.clientSecret = process.env.FBSECRET;

// Parse.com credidentials for Kaiseki
config.kaiseki = {};
config.kaiseki.appId = process.env.PARSEID;
config.kaiseki.restApiKey = process.env.PARSEKEY;

// JWT(JSON Web Token) encode and decode module settings
config.jwtSimple = {};
config.jwtSimple.secret = 'foobard'

config.thumbnails = {}
config.thumbnails.enabled = false;
config.thumbnails.quality = 20;

module.exports = config;
