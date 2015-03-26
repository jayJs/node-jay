"use strict";

$(document).ready(function() {

  // connect-livereload via Gulp autorefreshes the site.
  $("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');

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

    //e404.empty().out()
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
  }

  // MODEL
  // Set up routes
  crossroads.addRoute('/', listPostsView);
  crossroads.addRoute('/add', addPostView);
  crossroads.addRoute('/login', logInView);
  crossroads.addRoute('/p/{id}', onePostView);

  // start routing
  route(crossroads);

  // CONTROLLERS
  // Controller, "/"
  function listPostsFunction() {
    $.ajax({
      url: "/api/posts",
      success: function(data){
        listPosts.empty();
        for (var i = 0; i< data.length; i++) {
          listPosts.append('<h3><a href="#/p/'+data[i].objectId+'">'+data[i].title+'</a></h3>')
        }
      },
      error: function(error) {
        a(error.responseText);
        ce(error);
      }
    });
  }

  // Controller, "/add"
  function addPostFunction() {

    // reset form
    title.val("")
    content.val("")
    addCourseFile1.val("")
    addCourseFile2.val("")

    addPostSubmit.on('click', function(event) {
      event.preventDefault();
      addPostForm.submit();
    });

    var clicked = false;
    addPostForm.on("submit", function(event) {
      event.preventDefault();
      if(clicked === false) {
        addPostSubmit.attr('disabled','disabled')
        save('Posts', 'addPostForm').then(function(resp){ 
          addPostSubmit.removeAttr('disabled');
          window.location = "#/p/" + resp.objectId
        })
        clicked = true;
      }
    })
  }

  // Controller, "/p/{id}"
  function onePostFunction(id) {
    get("Posts", 1,  id).then(function(data) {
      if(data.error === "No such post") {
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
