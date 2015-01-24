
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

    listPosts.in('fadeIn');

    listPostsFunction();
  }

  var addPostView = function () {
    listPosts.out();
    onePost.out();
    editPost.out();

    addPost.in('fadeIn');

    addPostFunction();
  }

  var onePostView = function (id) {
    listPosts.out();
    addPost.out();
    editPost.out();

    onePost.in('fadeIn');

    onePostFunction(id);
  }

  var editPostView = function () {
    listPosts.out();
    addPost.out();
    onePost.out();

    editPost.in('fadeIn');

    editPostFunction();
  }


  // Admin view
  var adminView = function () {
    $("#frontPage, #otherPage").out();
    $("#admin").in();
    cl("Admin view shown");

    isUser(function(){ // is a user
      cl("user is logged in and his ID is shown");
      $("#fbLogin").out();
      $("#userInfo").in();
      $("#userIdShow").empty().append(window.userId);
    }, function() { // is not a user
      cl("user is asked to log in");
      $("#userInfo").out();
      $("#fbLogin").in();
    });

    adminFunction();
  }

  // MODEL
  // Set up routes
  crossroads.addRoute('/', listPostsView);
  crossroads.addRoute('/add', addPostView);
  crossroads.addRoute('/p/{id}', onePostView);
  crossroads.addRoute('/e/{id}', editPostView);

  // start routing
  route(crossroads);


  // CONTROLLERS
  // Controller, "/"
  function listPostsFunction() {
    //cl("Front page function called");
  }

  // Controller, "/add"
  function addPostFunction() {
    //cl("Front page function called");
    addProgramSubmit.on('click', function(event) {
      event.preventDefault();
      addPostForm.submit();
    });

    addPostForm.on("submit", function(event) { cl('what')
      event.preventDefault();
      post('addPostForm','Posts');
      //cl(post);
      //post("one", "two")
    })

  }

  // Controller, "/p/{id}"
  function onePostFunction(id) {
    //cl("Front page function called");
    //cl(id);

    //m1EXZK0iVk
    get("Posts", id).then(function(data) { cl(data);
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
    //cl("Front page function called");
  }



  // Controller, other page
  function otherPageFunction() {
    cl("Other page function called");

    get("Posts", "lQe4VuxRXE").then(function(data) {
      //otherPage.append("<br/>"+data.title);
      //a(data.title);
    });
  }


});
