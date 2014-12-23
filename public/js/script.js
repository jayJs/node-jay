// shortcut for console.log
function cl(data) {
    console.log(data);
}

$(document).ready(function() {

  // connect-livereload via Gulp autorefreshes the site.
  $("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');

  // hide loadin + show app
  $("#loading").addClass("animated fadeOut").addClass("hidden");
  $("#app").removeClass("hidden").addClass("animated fadeIn");

  // VIEWS
  // Front page view
  var frontView = function () {
    $("#otherPage").addClass("hidden").addClass("animated fadeOut");
    $("#frontPage").removeClass("hidden fadeOut").addClass("animated fadeIn");
    l("front page view shown");
    frontPageFunction();
  }

  // Other page view
  var otherView = function () {
    $("#frontPage").addClass("hidden").addClass("animated fadeOut");
    $("#otherPage").removeClass("hidden fadeOut").addClass("animated fadeIn");
    l("Other page view shown");
    otherPageFunction();
  }

  // MODEL
  // Set up routes
  crossroads.addRoute('/', frontView);
  crossroads.addRoute('/you', otherView);

  //setup hasher
  // hasher let's you know when route is changed
  function parseHash(newHash, oldHash){
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash); //parse initial hash
  hasher.changed.add(parseHash); //parse hash changes
  hasher.init(); //start listening for history change


  // CONTROLLERS
  // Controller, front page
  function frontPageFunction() {
    l("Front page function called");
  }

  // Controller, other page
  function otherPageFunction() {
    l("Other page function called");
  }

  // shortcut for log to #log
  function l(data) {
    $("#log").append(data+"<br />");
  }

});
