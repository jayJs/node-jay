var config = {};

// Server address and port
config.app = {};
config.app.host = 'localhost';
config.app.port =  process.env.PORT || 5000;

// Facebook credidentials
config.facebook = {};
config.facebook.clientId = '';
config.facebook.clientSecret = ''

// Parse.com credidentials for Kaiseki
config.kaiseki = {};
config.kaiseki.appId = "";
config.kaiseki.restApiKey = "";

// JWT(JSON Web Token) encode and decode module settings
config.jwtSimple = {};
config.jwtSimple.secret = 'foobar'

module.exports = config;
