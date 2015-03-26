"use strict";

$(document).ready(function() {

  // connect-livereload via Gulp autorefreshes the site.
  $("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');

  // hide loadin + show app
  $("#loading").addClass("animated fadeOut").addClass("hidden");
  $("#app").removeClass("hidden").addClass("animated fadeIn");

  function clearApp(){
    addPost.out()
    onePost.out()
    showPost.empty()
    listPosts.out()
    editPost.empty().out()
    logIn.empty().out()
    tabs.out()

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

    isUser(function(){ // is a user
      tabs.in();
    }, function() { // is not a user
      tabs.out();
    });


    viewLink.attr("href", "#/p/"+id);
    editLink.attr("href", "#/e/"+id);
    viewLink.parent().addClass("active");
    editLink.parent().removeClass("active");


    onePost.in('fadeIn');

    onePostFunction(id);
  }

  var editPostView = function (id) {
    clearApp()

    isUser(function(){ // is a user
      //tabs.in();
    }, function() { // is not a user
      tabs.out();
    });

    viewLink.attr("href", "#/p/"+id);
    editLink.attr("href", "#/e/"+id);
    viewLink.parent().removeClass("active");
    editLink.parent().addClass("active");

    editPost.in('fadeIn');

    editPostFunction();
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
  crossroads.addRoute('/e/{id}', editPostView);

  // start routing
  route(crossroads);


  // CONTROLLERS
  // Controller, "/"
  function listPostsFunction() {
    $.ajax({
      url: "/api/posts",
      success: function(data){
        postUl.empty();
        for (var i = 0; i< data.length; i++) {
          postUl.append('<li><h3><a href="#/p/'+data[i].objectId+'">'+data[i].title+'</a></h3>')
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
    addPostSubmit.on('click', function(event) {
      event.preventDefault();
      addPostForm.submit();
    });

    addPostForm.on("submit", function(event) {
      event.preventDefault();
      save('Posts', 'addPostForm');
    })
  }

  // Controller, "/p/{id}"
  function onePostFunction(id) {
    get("Posts", 1,  id).then(function(data) {
      if(typeof data.titles === "string") {
        data.titles = JSON.parse(data.titles);
      }
      showPost.empty();
      $.each(data, function(key, value) {
        if(key == "updatedAt" || key == "createdAt" || key == "objectId") {}
        else {
          if(value.length>0) {
            showPost.append("<h4>"+data.titles[key]+"<h4>");
            showPost.append(value);
          }
          // if it's a parse url
          if(value.url) {
            showPost.append("<h4>"+data.titles[key]+"<h4>");
            showPost.append("<img src='"+value.url+"' style='width: 300px; height: auto;'>");
          }
        }
      })
    });
  }

  // Controller, "/e/{id}"
  function editPostFunction() {
    // edit posts
  }




});
