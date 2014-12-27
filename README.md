J js  
===================

//A homage to jQuery.  
Build a MVP in no time.  
A boilerplate for a Single Page Application + server.

**Problem**

I've built more then 10 MVP-s in the past and I'm still maintaining quite a number of them.  
After some time I've found the code getting cluttered, some things not working in some browsers and myself doing the same mistakes over and over again.  

A Single Page App (SPA) architecture relying on a REST API has become my weapon of choice since they can be used as a website and in many cases also as an initial iOS / Android app.

Nevertheless, a SPA architecture can cause quite a lot of stress, especially when I try to add new features later on. To quote a former coworker - this javascript thing can become a flea circus real easy.  

To solve this problem, I'm using a Model-View-Controller-ish framework relying on Crossroads.js routing.  
The Model contains routes. If a route is matched a View function is called:

```
// Set up routing
crossroads.addRoute('/', frontView);
crossroads.addRoute('/admin', adminView);

//setup hasher
function parseHash(newHash, oldHash){
  crossroads.parse(newHash);
}
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change

```
The View includes information about what to turn on or off on the page and calls a Controller function.
```
var frontView = function () {
  $("#otherPage").out();
  $("#frontPage").in();
  frontPageFunction();
}
```
A controller function is the best place to keep all the logic functions (like "show a single post" or "show all of the posts") for this route.

```
function frontPageFunction() {
  $.ajax({
    url: "/api/post",
    success: function(data){
      // do something with the data
    },
    fail: function(error) {
      // show an error
    }
  });
}
```

Client side user authentication relies on Facebook. Function isUser() provides the possibility to apply different commands to anonymous or logged in users. Function isUser() determines that you are logged in before executing the functions. window.userId contains the user Facebook id.

```
function isLoggedIn() {
  $("#logInBox").hide();
  $("#logOutBox").show();  
  $("#content").append("Your user id is: " + window.userId);
}

function isNotLoggedIn() {
  $("#logOutBox").hide();  
  $("#logInBox").show();
}

isUser(isLoggedIn, isNotLoggedIn);  

```
OR  
```

isUser(function() { // logged in users
  $("#logInBox").hide();
  $("#logOutBox").show();  
  $("#content").append("Your user id is: " + window.userId);
  }, function (){ // not logged in users
    $("#logOutBox").hide();  
    $("#logInBox").show();
    });  

```
jQuery and Bootstrap do what they usually do, momentJs provides date manipulations and bower is used for package management. Functions in() and out() turn Bootstrap class "hidden" on and off. Giving it a animation name from animate.css - in("bounceInLeft") will decorate the entrance with a CSS animation.

```
$("#frontPage").out(); // hidden
$("#otherPage").in(); // shown
```
OR with animate.css animations:
```
$("#frontPage").out(); // hidden
$("#otherPage").in("fadeInLeft"); // shown with animation fadeInLeft

```

This architecture has two quirks:  
You have to turn views off after using them, which feels awkward in the beginning. The upside of this is that contemporary apps do not always rely on menus, it's rather a random thing turning other random things on and off. The other quirk is that views have to be defined before the models. I've never tried defining controllers before models.  

The name J or Jay is a wordplay with the name jQuery.  
I also like Jay-Z.  


**Goals:**  
* High browser compatibility  
* fast project start time  
* fast development time  
* good code maintainability  

**Instant**  
*Back-end tools:*  
Server via Node  
Database via Parse  
Backend via Parse  
*Authentication* - currently missing  

*Front-end tools:*  
Authentication via Facebook  
jQuery  
Bootstrap  
Animate.css - css animations  
momentJs - date manipulations  
crossroads.js - routing  
html5shiv, respond - compatibility  
Bower - package management  

MVCish framework for jQuery  
jQuery code is divided into 3 parts:  
Model - which function gets called on what URL. This depends on crossroads.js  
Views - which div-s are shown and which controller function is called.  
Controller - the logic of this view, for example which API gets called.  

**Helpers**  
cl(message) - shortcut for console.log(message);  
l(message) - print message to the #log
a(message) - print message as an alert to the top of the page for client.  
in(transition) - show an element (with a possible animate.css transition).  
out(transition) - hide an element (with a possible animate.css transition).  
isUser(isLoggedIn, isNotLoggedIn) - determine, if user is logged in  












This is old readme, waiting to be updated:


Blank Express + jQuery + Animate.css + Director + Bootstrap + Moment + Gulp (livereload) + Bower + Heroku  
===================


This is a boilerplate for beginning a new Single Page Application with the components listed in the header.


INSTALLATION AND STARTING UP
===================  

(Assuming you have everything else until node installed)  

Install npm and bower things:  
```
npm install  
cd public  
bower install  
```  

Run Gulp:  
```
gulp  
```  

Run the server:  
```
nodemon app.js
```  

Go to: http://localhost:5000/


INSTALLATION 2  

I've created a fancy shortcut for .bash_profile.
It does most of the things from INSTALLATION 1 automatically:  

```
alias initio='git clone git@github.com:martinsookael/tabularasa.git .;git remote remove origin; npm install; cd public; b install;'

```

ABOUT  
===================  


EXPRESS:  
Sets up a basic http server that serves the index.html file from public folder.  

GULP:  
Refreshes the browser every time something is edited in public folder.  

HEROKU:  
There is a Heroku specific Procfile present, that starts app.js if uploaded to Heroku.  

BOWSER  
is configured to install everything into folder "b"  

RESPONDJS  
brings media queries to IE 6-8  

HTML5SHIV  
brings HTML5 to IE  

JQUERY + BOOTSTRAP  
These guys do what they've always done.  
As a side note - Bootstrap also does a CSS reset.  

ANIMATE.CSS  
Provides simple animations through CSS.

DIRECTOR
