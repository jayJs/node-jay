/*jslint indent: 2*/
/*jslint todo: true */
/*jslint plusplus: true */
/*jslint regexp: true */
/*jslint vars: true */
/*global window, console, document, $, J, listPostsFunction, addPostFunction, onePostFunction, editPostFunction, crossroads, a, FB */

$(document).ready(function () {
  "use strict";

  J.wysiwg(true);

  // connect-livereload via Gulp autorefreshes the site.
  if (location.hostname === "localhost") {
    $("body").append('<script src="http://localhost:35729/livereload.js?snipver=1"></script>');
  }

  // hide loadin + show app
  $("#loading").hide();
  $("#app").show("fadeIn");

  function clearApp() {
    $(addPost).hide();
    $(onePost).hide();
    $(onePost).empty();
    $(listPosts).hide();
    $(logIn).hide();
    $(e404).hide();
    $("#admin").hide();

    $("#deletePost").hide();

    $('html,body').scrollTop(0);
  }

  // VIEWS
  // Front page view
  var listPostsView = function () {
    clearApp();
    $(listPosts).show('fadeIn');
    listPostsFunction();
  };

  var addPostView = function () {
    //J.isUser(function () { // is a user
      clearApp();
      J.resetForm("addPostForm");
      $(addPost).show('fadeIn');
      addPostFunction();
    //}, function () { // is not a user
    //  window.location = "#/login";
    //});
  };

  var onePostView = function (id) {
    clearApp();
    $(onePost).show();
    onePostFunction(id);
  };

  var editPostView = function (id) {
    //J.isUser(function () { // is a user
      clearApp();
      $("#deletePost").show('fadeIn');
      $(addPost).show('fadeIn');
      editPostFunction(id);
    //}, function () { // is not a user
    //  window.location = "#/login";
    //});
  };

  function adminView () {
    clearApp();
    $("#admin").show('fadeIn');
    adminFunction();
  }

  var logInView = function () {
    clearApp();
    $(logIn).show();
    logInFunction();
  };

  // MODEL
  // Set up routes
  crossroads.addRoute('/', listPostsView);
  crossroads.addRoute('/add', addPostView);
  crossroads.addRoute('/login', logInView);
  crossroads.addRoute('/p/{id}', onePostView);
  crossroads.addRoute('/e/{id}', editPostView);
  crossroads.addRoute('/admin', adminView);

  // that's a 404 if the route structure is not matched
  crossroads.bypassed.add(function () {
    clearApp();
    $(e404).show();
  });

  // start routing
  J.route(crossroads);

  // CONTROLLERS
  // Controller, "/"
  function listPostsFunction() {
    J.get("Posts", 20).then(function (data) {
      if (data.error === "No such post") {
        $(e404).show();
      } else {
        $(listPosts).empty();
        var i;
        for (i = 0; i < data.length; i++) {
          $(listPosts).append('<h3><a href="#/p/' + data[i].objectId + '">' + data[i].title + '</a></h3>');
        }
      }
    });
  }

  // common things for new posts and posts editing.
  function editPost() {
    // detect if browser is able to accept uploading files.
    var canUploadFiles = J.detectFileUpload();
    if (canUploadFiles === false) {
      a("This browser does not support file uploads");
      $(image).parent().hide();
    }

    // create the preview for image
    $('#image').change(function () {
      var blob = J.getBlobURL($(this));
      if (blob !== false) {
        $(imagePreview).css("background-image", "url(" + blob + ")");
      }
    });

    // reset the form
    J.resetForm("addPostForm");
    $(imagePreview).css("background-image", "");
  }

  // Controller, "/add"
  function addPostFunction() {
    editPost();
    J.save("Posts", 'addPostForm', function (data) {
      // todo: error handling
      window.location = "#/p/" + data.objectId;
    });
  }

  // Controller, "/e/{id}"
  function editPostFunction(id) {

    editPost();
    J.get("Posts", 1, id).then(function (data) {
      var d = data[0];
      J.rebuildForm("addPostForm", d);
      // rebuildForm() does not take input file yet, so:
      if (d.image && d.image.url) { $(imagePreview).css("background-image", "url(" + d.image.url + ")"); }
    });
    J.update("Posts", 'addPostForm', id, function (data) {
      // todo: error handling
      window.location = "#/p/" + id;
    });

    $("#deletePost").off('click').on('click', function (event) {
      event.preventDefault();
      J.remove("Posts", id).then(function (response) {
        if (response.error) {
          a(response.error)
        } else {
          location.href = "#/"
        }
      });
    });
  }

  function adminFunction () {

    // CLEAR OLD TABLE
    $("#adminData th").remove();
    $("#adminData td").remove();
    // GET POSTS
    J.get("Posts", 20).then(function (posts) {
      var i;
      var keys = [];
      for (i=0; i < posts.length; i++) {
        // CREATE A ROW
        $("#adminData>tbody").append("<tr>")
        for(var key in posts[i]){
          if (key !== "titles") {
            $("#adminData>tbody").append("<td><textarea data-id='" + posts[i].objectId + "' data-key='" + key + "'>" + posts[i][key] + "</textarea></td>")
            var isKey = keys.indexOf(key);
            if (isKey < 0) {
              keys.push(key);
            }
          }
        }
        $("#adminData>tbody").append("</tr>")
      }
      // CREATE HEADER OUT OF KEYS
      var j;
      for (j=0; j < keys.length; j++) {
        $("#adminData>thead>tr").append("<th>" + keys[j] + "</th>");
      }

      // CREATE AUTORESIZE
      $("#adminData textarea").off('click').on('click', function () {
        var ta = document.querySelector('textarea');
        autosize.destroy($("textarea"));
        $("#adminData td").css("height", "20px"); // TODO NOT WORKING
        $(this).css('height', '100%');
        autosize($(this));
      });

      // SAVE DATA ON BLUR
      $("#adminData textarea").off('blur').on('blur', function () {
        var id = $(this).attr("data-id");
        var key = $(this).attr("data-key");
        var value =  $(this).val()
        var fd = new FormData();
        var $post = $(this);
        fd.append(key, value);
        J.put("Posts", id, fd).then(function () {
          $post.css('border', '1px solid #080');
          setTimeout(function () {
            $post.css('border', '1px solid #eee');
          }, 500)
        });
      });
    });
  }

  function logInFunction() {
    $(fbLogin).on('click', function () {
      FB.login(function (response) {
        if (response.authResponse) {
          FB.api('/me', function (response) {
            J.userId = response.id;
            J.checkIn();
          });
        } else {
          J.userId = false;
          window.location = "#/login";
        }
      });
    });
  }

  // Controller, "/p/{id}"
  function onePostFunction(id) {
    J.get("Posts", 1,  id).then(function (data_0) {
      var data = data_0[0];
      if (data_0.error === "No such post" || data_0.error === "Query is confused") {
        $(e404).show();
      } else {
        var titles = data.titles
        if (typeof data.titles === "string") {
          titles = titles.replace(/&quot;/g, '\"');
          data.titles = JSON.parse(titles);
        }
        $(onePost).empty();
        $.each(data, function (key, value) {
          if (key === "updatedAt" || key === "createdAt" || key === "objectId" || key === "_id") {
            // empty block
          } else {
            if (value.length > 0) {
              $(onePost).append("<h4>" + data.titles[key] + "<h4>");
              $(onePost).append(value);
            }
            // if it's a parse url
            if (value.url) {
              $(onePost).append("<h4>" + data.titles[key] + "<h4>");
              $(onePost).append("<img src='" + value.url + "' style='width: 300px; height: auto;'>");
            }
          }
        });
        $(onePost).append("<br /><br /><br /><a href='#/e/" + id + "'>Edit this post</a>");
      }
    });
  }
});
