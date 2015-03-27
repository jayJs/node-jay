var config = {};

// Server address and port
config.app = {};
config.app.host = 'localhost';
config.app.port =  process.env.PORT || 5000;

// Facebook credidentials
config.facebook = {};
config.facebook.client_id = '';
config.facebook.client_secret = ''

// Parse.com credidentials for Kaiseki
config.kaiseki = {};
config.kaiseki.appId = "";
config.kaiseki.restApiKey = "";

// JWT(JSON Web Token) encode and decode module settings
config.jwt_simple = {};
config.jwt_simple.secret = 'foobar'

module.exports = config;
