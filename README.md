J js  
===================

//A homage to jQuery.  
Build a MVP in no time.
A boilerplate for a Single Page Application + server.  

**Goals:**  
* High browser compatibility  
* fast project start time  
* fast development time  
* good code maintainability  

**Instant**  
Server via Node  
Database via Parse  
Backend via Parse  

Front-end tools:  
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
Model - which function gets called on what URL.  
Views - which div-s are shown and which controller function is called.  
Controller - the logic of this view, for example which API gets called.  

**Helpers**  
cl(message) - shortcut for console.log(message);  
l(message) - print message to the #log  
a(message) - print message as an alert to the top of the page for client.  
isUser(isLoggedIn, isNotLoggedIn) - determine, if user is logged in  

**Using isUser()**  
```
function isLoggedIn() {
  $("#logInBox").hide();
  $("#logOutBox").show();  
}

function isNotLoggedIn() {
  $("#logOutBox").hide();  
  $("#logInBox").show();
}

isUser(isLoggedIn, isNotLoggedIn);  

```
OR  
```
function isLoggedIn() {
}

function isNotLoggedIn() {
  $("#logOutBox").hide();  
  $("#logInBox").show();
}

isUser(function() { // logged in users
  $("#logInBox").hide();
  $("#logOutBox").show();  
}, function (){ // not logged in users
  $("#logOutBox").hide();  
  $("#logInBox").show();
});  

```







**Todo:**  
Authentication  
will be on page load done via Facebook, Twitter, or Google connect.








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
