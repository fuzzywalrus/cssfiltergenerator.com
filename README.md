# [CSSFilterGenerator.com](http://www.cssfiltergenerator.com/) Source Code

CSS filters allow graphical effects, leverging inbrowser post-processing of images. Create and share Instagram like filters with non-destructive edits and/or animated effects for use in your web projects.


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

###Setting up

This project requires Node JS/Grunt. For more info see, [nodejs.org](https://nodejs.org/en/)[gruntjs.com/](http://gruntjs.com/) and assumes basic terminal usage.
This project by default is configured to use cssgradientgenerator.lvh.me to the root directory, in order to use browserSync. Configure this in your apache vhosts, MAMP/LAMP or any program you use to manage your virtual hosts. 

Go to the _build/ directory, and run npm install to install the necessary grunt packages.
from the _build/ directory run grunt
