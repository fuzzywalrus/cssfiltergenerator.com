module.exports = function(grunt) {

	require("load-grunt-tasks")(grunt);

	var config = {
		localProxy : "http://cssfiltergenerator.lvh.me", //your local url
		baseDir : ".", // working dir
	}
	// Project configuration.
	grunt.initConfig({

		//Read the package.json (optional)
		pkg: grunt.file.readJSON('package.json'),

		//triggered on saves
		watch: {
			sass : {
				files: ['../scss/**/*'],
				tasks: ["sass","autoprefixer","cssmin"]
			},
			gruntfile: {
					files: ["Gruntfile.js"]
			},
			js : {
				files: ['../js/source/**/*', '../js/app/**/*'],
				tasks : ["jshint","jscs","uglify"]
			}
		},
		uglify: {
			dev: {
				files: {
					"../js/app-min.js": ["../js/source/*", "../js/app/*" ]
				}
			},
			options: {
				mangle: true,
				beautify: false
			}
		},
		// docs http://jshint.com/docs/options/
		jshint: {
			dev : {
				files : {
					src : ["../js/app/app.js"]
				},
				options : {
					strict: true
				}
			}
		},
		// docs http://jscs.info/rules.html
		jscs: {
			src: "../js/app/app.js",
			options: {
				config: ".jscs.json",
				requireCurlyBraces: [ "if" ]
			}
		},
		sass: {
			dist: {
				files: {
					'../css/main.css' : '../scss/main.scss'
				}
			}
		},
		//docs https://github.com/nDmitry/grunt-autoprefixer
		autoprefixer: {
			options: {
				browsers: ["last 2 version", "ie 8", "ie 9", "FireFox > 4", "Safari > 3"]
			},
			dist: {
				files: [{
					src: "../css/main.css",
					dest: "../css/main.prefixed.css"
				}]
			}
		},
		// take autoprefixer css and minify
		cssmin: {
			options: {
				sourceMap: true
			},
			minify: {
				src: "../css/main.prefixed.css",
				dest: "../css/main-min.css"
			}
		},
		browserSync: {
            dev: {
        		middleware: function (req, res, next) {
					res.setHeader('Access-Control-Allow-Origin', '*');
					next();
				},
            	files: [
				    {
				        match: ["**/*.map"],
				        fn: function (event, file) {
				            /** Custom event handler **/
				        },
				        options: {
				            ignored: '*.map'
				        }
				    }
				],
              bsFiles: {
                  src : [
									"../css/*.css",
									"../img/**/*.jpg",
									"../img/**/*.png",
									"../js/**/*.js",
									"**/*.php",
									"../**/*.php",
									"**/*.html"
								]
                },
                options: {
                    watchTask: true,
                    proxy: config.localProxy
                }
            }
        }
		//docs http://www.browsersync.io/docs/grunt/
	});
	require('time-grunt')(grunt);
	grunt.loadNpmTasks('grunt-newer');

	// Default tasks (runs them all at start to catch any updates from version control)
	grunt.registerTask("default", ["browserSync","watch"]);
};
