
$(document).ready(function() {

  // connect-livereload via Gulp autorefreshes the site.
  $("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');

  // hide loadin + show app
  $("#loading").addClass("animated fadeOut").addClass("hidden");
  $("#app").removeClass("hidden").addClass("animated fadeIn");

  // VIEWS
  // Front page view
  var frontView = function () {
    otherPage.out();
    admin.out();
    //$("#otherPage, #admin").out(); // For longer lists
    frontPage.in();
    l("Front page view shown");
    frontPageFunction();
  }

  // Other page view
  var otherView = function () {
    frontPage.out();
    admin.out();

    otherPage.in("bounce");
    l("Other page view shown");
    otherPageFunction();
  }

  // Admin view
  var adminView = function () {
    $("#frontPage, #otherPage").out();
    $("#admin").in();
    l("Admin view shown");

    isUser(function(){ // is a user
      l("user is logged in and his ID is shown");
      $("#fbLogin").out();
      $("#userInfo").in();
      $("#userIdShow").empty().append(window.userId);
    }, function() { // is not a user
      l("user is asked to log in");
      $("#userInfo").out();
      $("#fbLogin").in();
    });

    adminFunction();
  }

  // MODEL
  // Set up routes
  crossroads.addRoute('/', frontView);
  crossroads.addRoute('/you', otherView);
  crossroads.addRoute('/admin', adminView);

  // start routing
  route(crossroads);

  // CONTROLLERS
  // Controller, front page
  function frontPageFunction() {
    l("Front page function called");
  }

  // Controller, other page
  function otherPageFunction() {
    l("Other page function called");
  }

  // admin view controller
  function adminFunction() {
    l("Admin function called");
  }

});
