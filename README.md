J js  
===================

A homage to jQuery.  
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
jQuery  
Bootstrap  
Animate.css - css animations  
momentJs - date manipulations  
crossroads.js - routing  
html5shiv, respond - compatibility
Bower - package management  

MVCish framework for jQuery  
jQuery code is divided into 3 parts:  
Model - here you decide, which function for view gets called.  
Views - here you define which div-s are shown for this view and call.  
Controller - here you keep the logic of this view, for example which API gets called.  



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
