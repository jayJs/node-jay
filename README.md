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

##INSTALLATION AND STARTING UP

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


##INSTALLATION 2  

I've created a fancy shortcut for .bash_profile.
It does most of the things from INSTALLATION 1 automatically:  

```
alias initio='git clone git@github.com:jayJs/node-jay.git .;git remote remove origin; npm install; cd public; b install;'

```

##ABOUT  


**EXPRESS**  
Sets up a basic http server that serves the index.html file from public folder.  

**GULP**  
Refreshes the browser every time something is edited in public folder.  

**HEROKU**  
There is a Heroku specific Procfile present, that starts app.js if uploaded to Heroku.  

**BOWSER**  
is configured to install everything into folder "b"  

**RESPONDJS**  
brings media queries to IE 6-8  

**HTML5SHIV**  
brings HTML5 to IE  

**JQUERY + BOOTSTRAP**  
These guys do what they've always done.  
As a side note - Bootstrap also does a CSS reset.  

**ANIMATE.CSS**  
Provides simple animations through CSS.

**JAY**  
a jQuery MVC framework


##Licence

The MIT License (MIT)

Copyright (c) 2014 Mark Litwintschik

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
