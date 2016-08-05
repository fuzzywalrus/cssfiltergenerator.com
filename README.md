# [CSSFilterGenerator.com](http://www.cssfiltergenerator.com/) Source Code

![logo](http://cssfiltergenerator.com/img/simple.png)

CSS filters allow graphical effects, leverging inbrowser post-processing of images. Create and share Instagram-like filters with non-destructive edits and/or animated effects for use in your web projects.

###Core Features
* Live Preview
* Live CSS generation
* Reorderable filtering
* CSS Gradient Overlays
* Sharable Filter URLs (remembers list order)
* Presets
* Swappable demo live preview image
* Support information
* Accessibility friendly (Fully tabbable interface)

####Planned Features
* Presets reorder lists
* Better Sorting
* UI refinement
* Uploadable Preview (will not save images)
* Improved Mobile Support
* Graceful error fallback messaging for no-js, limited support browsers, old browsers. (Modernizr/headJS)

####Nixed Features
* Sharable preview images. For the benefit of maintaining a quality user experience, external linked images will not be sharable for several reasons: performance, copyright (sharable uploaded images may infringe on rights), hosting, and general good taste. This is a simple single static single page app. :) 
* Full featured gradient generator. This may be revisited in the future but in the interest of scope, this has been shelved.

###Site Structure

Currently CSSFilterGenerator uses the following libaries. 
* jQuery - linked via CDN
* [HeadJS](http://headjs.com/) - linked via CDN
* [Sortable](https://github.com/RubaXa/Sortable) - in source
* [Spectrum.JS](https://bgrins.github.io/spectrum/) - in source
* [Handlebars.JS](http://handlebarsjs.com/) - in source
* Bootstrap 3 Sass (heavily modified) - in source
(Thanks to the many authors who put in the hardwork to make this project feasible).

Site currently does not require any server-side setup other than a root directory for absolute pathing, as no server-side languages are used.

The three notable files are as follows:
js/app/app.js - Where all the custom javascript lives
scss/main.scss - Master Sass file that controls all the imports 
index.html - where all the markup lives including the Handlebars templating

###Setting up

This project requires Node JS/Grunt. For more info see, [nodejs.org](https://nodejs.org/en/)[gruntjs.com/](http://gruntjs.com/) and assumes basic terminal usage.

This project by default is configured to use cssgradientgenerator.lvh.me to the root directory, in order to use BrowserSync. Configure this in your apache vhosts, MAMP/LAMP or any program you use to manage your virtual hosts. 

Go to the _build/ directory, and run npm install to install the necessary grunt packages.
from the _build/ directory run grunt.

Grunt is configured to handle JS concat, uglify, and minification for buildsbuilds, some JSlinting, Sass (using libsass) builds with source maps and minification, and BrowserSync to inject CSS changes / reload for Javascript / HTML changes and for testing on multiple devices.

###Library Roles
HeadJS - Used to create error messaging for IE, and warnings for Safari and Edge (for now).
SpectrumJS - Handles the ColorPicker functionality used for overlays. 
Sortable - Drag and drop functionality used for list reordering for the filters
Handlebars - Only used for writes to the DOM for HTML needed for the filters.
