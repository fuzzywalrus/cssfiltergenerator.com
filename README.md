# CSSFilterGenerator.com Source Code

###Site Structure

Currently CSSFilterGenerator uses the following libaries,
* jQuery - linked via CDN
* JQuery UI - linked via CDN
* [Spectrum.JS](https://bgrins.github.io/spectrum/) - in source
* [Handlebars.JS](http://handlebarsjs.com/) - in source
* Bootstrap 3 Sass (heavily modified)

Site currently does not require any server-side setup other than a root directory for absolute pathing, as no server-side languages are used.

The three notable files are as follows:
js/app/app.js - Where all the custom javascript lives
scss/main.scss - Master Sass file that controls all the imports 
index.html - where all the markup lives including the Handlebars templating

Soon to come: Grunt build
