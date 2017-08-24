# [CSSFilterGenerator.com](http://www.cssfiltergenerator.com/) Source Code

![logo](http://cssfiltergenerator.com/img/simple.png)

## Tagline
CSS filters allow graphical effects, leveraging inbrowser post-processing of images. Create and share Instagram-like filters with non-destructive edits and/or animated effects for use in your web projects.

### Core Features
* Live Preview
* Live CSS generation
* Re=orderable filtering
* CSS Gradient Overlays
* Sharable URLs to custom (remembers list order)
* Presets
* Swappable demo live preview image
* Support information
* Accessibility friendly (Fully tabbable interface)

### Planned Features
* Presets reorder lists
* UI refinement
* Uploadable Preview (will not save images)
* Improved Mobile Support 

### Nixed Features
* Sharable preview images. For the benefit of maintaining a quality user experience, external linked images will not be sharable for several reasons: performance, copyright (sharable uploaded images may infringe on rights), hosting, and general good taste. This is a simple single static single page app. :) 
* Full featured gradient generator. This may be revisited in the future but in the interest of scope, this has been shelved.

## Site Structure

Currently CSSFilterGenerator uses the following libraries. 
* jQuery - linked via CDN
* [HeadJS](http://headjs.com/) - linked via CDN
* [Sortable](https://github.com/RubaXa/Sortable) - in source
* [Spectrum.JS](https://bgrins.github.io/spectrum/) - in source
* [Handlebars.JS](http://handlebarsjs.com/) - in source
* Bootstrap 3 Sass (heavily modified) - in source
(Thanks to the many authors who put in the hard-work to make this project feasible).

Currently this project does not require any server-side setup other than a root directory for absolute pathing, as no server-side languages are used.

The three notable files are as follows:
js/app/app.js - This is where all the custom javascript lives
scss/main.scss - This is the master Sass file that controls all the imports 
index.html - This is where all the markup lives including the Handlebars templating

### Setting up

This project requires Node JS/Grunt. For more info see, [nodejs.org](https://nodejs.org/en/) & [gruntjs.com/](http://gruntjs.com/) and assumes basic terminal usage.

This project by default is configured to use cssgradientgenerator.lvh.me to the root directory, in order to use BrowserSync. Configure this in your apache vhosts or MAMP/LAMP or any program you use to manage your virtual hosts. 

Go to the _build/ directory, and run npm install to install the necessary grunt packages.
from the _build/ directory run grunt.

Grunt is configured to handle JS concat, uglify, and minification for builds, some JSlinting, Sass (using libsass) builds with source maps and minification, and BrowserSync to inject CSS changes / reload for Javascript / HTML changes and for testing on multiple devices.

### Library Roles
HeadJS - Used to create error messaging for IE, and warnings for Safari and Edge (for now, planned to use Modernzr for feature detection).

SpectrumJS - Handles the ColorPicker functionality used for overlays. 

Sortable - Drag and drop functionality used for list reordering for the filters

Handlebars - Only used for writes to the DOM for HTML needed for the filters.
