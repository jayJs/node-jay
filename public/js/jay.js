// shortcut for console.log
function cl(data) {
  console.log(data);
}

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

// hello hello, facebook connect and #_=_
if (window.location.hash && window.location.hash == '#_=_') {
  window.location.hash = '/admin';
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
