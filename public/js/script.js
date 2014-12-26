// shortcut for console.log
function cl(data) {
    console.log(data);
}

// hello hello, facebook connect and #_=_
if (window.location.hash && window.location.hash == '#_=_') {
  window.location.hash = '/admin';
}

function isUser(){
  FB.getLoginStatus(function(response){
    if (response.status === "connected") {
      return response.authResponse.userID;
    } else {
      return false;
    }
  });
}



$(document).ready(function() {

  // connect-livereload via Gulp autorefreshes the site.
  //$("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');

  // hide loadin + show app
  $("#loading").addClass("animated fadeOut").addClass("hidden");
  $("#app").removeClass("hidden").addClass("animated fadeIn");

  // VIEWS
  // Front page view
  var frontView = function () {
    $("#otherPage, #admin").addClass("hidden").addClass("animated fadeOut");
    $("#frontPage").removeClass("hidden fadeOut").addClass("animated fadeIn");
    l("Front page view shown");
    frontPageFunction();
  }

  // Other page view
  var otherView = function () {
    $("#frontPage, #admin").addClass("hidden").addClass("animated fadeOut");
    $("#otherPage").removeClass("hidden fadeOut").addClass("animated fadeIn");
    l("Other page view shown");
    otherPageFunction();
  }

  // Admin view
  var adminView = function () {
    $("#frontPage, #otherPage").addClass("hidden").addClass("animated fadeOut");
    $("#admin").removeClass("hidden fadeOut").addClass("animated fadeIn");
    l("Admin view shown");

    // if logged in

    if(window.userId != undefined) {
      l("is user");
      $("#fbLogin").addClass("hidden").addClass("animated fadeOut");
      $("#userInfo").removeClass("hidden fadeOut").addClass("animated fadeIn");
      $("#userIdShow").empty().append(window.userId);
    } else { // logged in

      
      //or FB has not yet responded
        // wait till FB answers

      l("is no user");
      $("#userInfo").addClass("hidden").addClass("animated fadeOut");
      $("#fbLogin").removeClass("hidden fadeOut").addClass("animated fadeIn");
    }

    adminFunction();
  }

  // MODEL
  // Set up routes
  crossroads.addRoute('/', frontView);
  crossroads.addRoute('/you', otherView);
  crossroads.addRoute('/admin', adminView);

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

  // admin view controller
  function adminFunction() {
    l("Admin function called");
  }


  // shortcut for log to #log
  function l(data) {
    $("#log").append(data+"<br />");
  }

});
