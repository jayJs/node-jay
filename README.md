Node-Jay
===================

Backend for a SPA page relying on [Jay](https://github.com/jayJs/jay).

**Instant back-end**  
Server via Node
(Express via Node)  
Database via Parse
Backend via Parse  
Authentication - currently half there  
Gulp livereload  
Heroku Procfile  

**Instant front-end**  
jQuery  
Bootrap  
Animate.css  
Crossroads.js - routing  
MomentJS - date manipulations  
FB SDK - Facebook integration  
Bower - package management  
Jay

Jay is a jQuery MVC framework for rapid building of Single Page Applications.  
  
INSTALLATION AND STARTING UP
===================  

(Assuming you have npm & bower installed)  

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
alias initio='git clone git@github.com:jayJs/node-jay.git .;git remote remove origin; npm install; cd public; b install;'

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

JAY
a jQuery MVC framework
