"use strict";

$(document).ready(function() {

  // connect-livereload via Gulp autorefreshes the site.
  //$("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');

  // hide loadin + show app
  $("#loading").out()
  $("#app").in("fadeIn")

  function clearApp(){
    addPost.out()
    onePost.out()
    onePost.empty()
    listPosts.out()
    logIn.out()
    e404.out()

    $('html,body').scrollTop(0)
  }

  // VIEWS
  // Front page view
  var listPostsView = function () {
    clearApp()
    listPosts.in('fadeIn')
    listPostsFunction()
  }

  var addPostView = function () {
    clearApp()
    isUser(function(){ // is a user
      addPost.in('fadeIn');
    }, function() { // is not a user
      window.location = "#/login";
    });
    addPostFunction();
  }

  var onePostView = function (id) {
    clearApp()
    onePost.in('fadeIn');
    onePostFunction(id);
  }

  var logInView = function() {
    clearApp()
    logIn.in();
    logInFunction()
  }

  // MODEL
  // Set up routes
  crossroads.addRoute('/', listPostsView);
  crossroads.addRoute('/add', addPostView);
  crossroads.addRoute('/login', logInView);
  crossroads.addRoute('/p/{id}', onePostView);

  // that's a 404 if the route structure is not matched
  crossroads.bypassed.add(function(request){
    clearApp()
    e404.in()
  })

  // start routing
  route(crossroads);

  // CONTROLLERS
  // Controller, "/"
  function listPostsFunction() {
    get("Posts", 20).then(function(data){
      if(data.error === "No such post") {
        e404.in()
      } else {
        listPosts.empty();
        for (var i = 0; i< data.length; i++) {
          listPosts.append('<h3><a href="#/p/'+data[i].objectId+'">'+data[i].title+'</a></h3>')
        }
      }
    })
  }

  // Controller, "/add"
  function addPostFunction() {

    // detect if browser is able to accept uploading files.
    var canUploadFiles = detectFileUpload();
    if(canUploadFiles === false) {
      a("This browser does not support file uploads");
      image.parent().out()
    }

    // create the preview for image
    $('#image').change(function(){
      var blob = getBlobURL($(this));
      if(blob != false) {
        imagePreview.css("background-image", "url("+blob+")")
      }
    })

    // reset the form
    resetForm("addPostForm");

    // handle clicking the submit button
    addPostSubmit.on('click', function(event) {
      event.preventDefault();
      addPostForm.submit();
    });

    // handle sending the form
    var clicked = false;
    addPostForm.on("submit", function(event) {
      event.preventDefault();
      if(clicked === false) {
        pleaseWait.in()
        addPostSubmit.attr('disabled','disabled')
        save('Posts', 'addPostForm').then(function(resp){
          addPostSubmit.removeAttr('disabled');
          pleaseWait.out()
          window.location = "#/p/" + resp.objectId
        })
        clicked = true;
      }
    })
  }

  function logInFunction(){
    fbLogin.on('click', function(){
      FB.login(function(response) {
        if (response.authResponse) {
          FB.api('/me', function(response) {
            J.userId = response.id;
            checkIn()
          });
        } else {
          J.userId = false;
          window.location = "#/login"
        }
      });
    })
  }

  // Controller, "/p/{id}"
  function onePostFunction(id) {
    get("Posts", 1,  id).then(function(data_0) {
      var data = data_0[0]
      if(data_0.error === "No such post" || data_0.error === "Query is confused") {
        e404.in()
      } else {
        if(typeof data.titles === "string") {
          data.titles = JSON.parse(data.titles);
        }
        onePost.empty();
        $.each(data, function(key, value) {
          if(key == "updatedAt" || key == "createdAt" || key == "objectId") {}
          else {
            if(value.length>0) {
              onePost.append("<h4>"+data.titles[key]+"<h4>");
              onePost.append(value);
            }
            // if it's a parse url
            if(value.url) {
              onePost.append("<h4>"+data.titles[key]+"<h4>");
              onePost.append("<img src='"+value.url+"' style='width: 300px; height: auto;'>");
            }
          }
        })
      }
    });
  }
});
