
$(document).ready(function() {

  // connect-livereload via Gulp autorefreshes the site.
  $("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');

  // hide loadin + show app
  $("#loading").addClass("animated fadeOut").addClass("hidden");
  $("#app").removeClass("hidden").addClass("animated fadeIn");

  // VIEWS
  // Front page view
  var listPostsView = function () {
    addPost.out();
    onePost.out();
    editPost.out();
    tabs.out();
    logIn.out();

    listPosts.in('fadeIn');

    listPostsFunction();
  }

  var addPostView = function () {
    listPosts.out();
    onePost.out();
    editPost.out();
    tabs.out();
    logIn.out();

    isUser(function(){ // is a user
      addPost.in('fadeIn');
    }, function() { // is not a user
      window.location = "#/login";
    });

    addPostFunction();
  }

  var onePostView = function (id) {
    listPosts.out();
    addPost.out();
    editPost.out();
    logIn.out();

    isUser(function(){ // is a user
      //tabs.in();
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
    listPosts.out();
    addPost.out();
    onePost.out();
    logIn.out();

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
    listPosts.out();
    addPost.out();
    onePost.out();
    tabs.out();

    logIn.in();

  }


  // Admin view
  var adminView = function () {
    $("#frontPage, #otherPage").out();
    $("#admin").in();

    isUser(function(){ // is a user
      $("#fbLogin").out();
      $("#userInfo").in();
      $("#userIdShow").empty().append(window.userId);
    }, function() { // is not a user
      $("#userInfo").out();
      $("#fbLogin").in();
    });

    adminFunction();
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

    addProgramSubmit.on('click', function(event) {
      event.preventDefault();
      addPostForm.submit();
    });

    addPostForm.on("submit", function(event) {
      event.preventDefault();
      post('addPostForm','Posts');
    })
  }

  // Controller, "/p/{id}"
  function onePostFunction(id) {
    get("Posts", id).then(function(data) {
      showPost.empty();
      $.each(data, function(key, value) {
        if(key == "updatedAt" || key == "createdAt" || key == "objectId") {}
        else {
          if(value.length>0) {
            showPost.append("<h4>"+data.titles[key]+"<h4>");
            showPost.append(value);
          }
        }
      })
    });
  }

  // Controller, "/e/{id}"
  function editPostFunction() {
    get("Posts", id).then(function(data) {
      showPost.empty();
      $.each(data, function(key, value) {
        if(key == "updatedAt" || key == "createdAt" || key == "objectId") {}
        else {
          if(value.length>0) {
            showPost.append('<p><label for="'+);
            showPost.append("<h4>"+data.titles[key]+"<h4>");
            showPost.append("<h4>"+data.titles[key]+"<h4>");
            showPost.append(value);
          }
        }
      })
    });
  }


  <p><label for="title">Title</label><br /><input id="title" type="text" class="form-control" /><br /></p>
  <p>
  <label for="content">Content</label><br />
  <textarea id="content" type="text" style="height: 150px;" class="form-control"></textarea><br />
  </p>
  <input id="editProgramSubmit" class="btn button" type="submit">




});
