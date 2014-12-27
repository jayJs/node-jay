// hello hello, facebook connect and #_=_
if (window.location.hash && window.location.hash == '#_=_') {
  window.location.hash = '/admin';
}

// shortcut for console.log
function cl(data) {
  console.log(data);
}

// write to alert
function a(message) {
  document.getElementById('alertMessage').innerHTML = message;
  document.getElementById('alert').classList.remove("hidden");
}

// shortcut for log to #log
function l(data) {
  var log = document.getElementById('log');
  log.innerHTML = log.innerHTML + data+"<br />";
  log.scrollTop = log.scrollHeight;
}

function isUser (isLoggedIn, notLoggedIn) {
  // if it's a user
  if(window.userId != undefined && window.userId != false) {
    //isLoggedIn();
    isLoggedIn();
    // if it's not a user or we are not sure yet
  } else {
    var i = 0;
    var getStatus = setInterval(function(){
      // is not a user
      if(window.userId === false) {
        notLoggedIn();
        clearInterval(getStatus);
      }
      // is a user or not sure yet
      else {
        // is a user
        if(window.userId != undefined) {
          isLoggedIn();
          clearInterval(getStatus);
        } else {
          // FB is not yet available
          if(i === 20) { // turn off the search after 20 times
            notLoggedIn();
            a('Unable to authenticate. Refresh page to try again');
            clearInterval(getStatus);
          }
          i++;
        }
      }
    }, 100); // Ping every 100 ms
  }
}
/*
jQuery.fn.extend({
  out: function(message) { cl(message);
        if (message === undefined) { cl("out");
          this.addClass("hidden");
        }
    return this;
    //cl(input);
    //cl("out: " + this[0].className);
    //this.css("position","absolute").addClass("animated bounceOutRight").addClass("hidden").css("position","relative").removeClass("animated bounceOutRight");
  },
  in: function(input) { cl(input);
    if (input === undefined) { cl("in");
      this.addClass("hidden");
    }
    //cl(input);
    //cl("in: " + this[0].className);
    //this.removeClass("hidden bounceOutRight").addClass("animated bounceInLeft");
    return this;
  }
}); */

$.fn.out = function(transition) {
  return this.each(function() {
    var elem = $( this );
    if (transition === undefined) {
      elem.addClass("hidden");
    } else {
      elem.addClass("animated " + transition).addClass("hidden");
      elem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        elem.removeClass("animated " + transition);
      });
      //setTimeout(function(){ elem.removeClass("animated " + transition) }, 2000);
    }
    return this;
  });
}

$.fn.in = function(transition) {
  return this.each(function() {
    var elem = $( this );
    if (transition === undefined) {
      elem.removeClass("hidden");
    } else {
      elem.addClass("animated " + transition).removeClass("hidden");
      elem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        elem.removeClass("animated " + transition);
      });
      //setTimeout(function(){ elem.removeClass("animated " + transition) }, 2000);
    }
    return this;
  });
}
