(function(jQuery) {
  "use strict";
  var Engine;
    jQuery(document).ready(function() {
      Engine = {
        template : {
          //Mustachejs calls
          writeCSS : function(filters, hoverState) {
            //writes the css filter to the dom
            var source   = $("#filter-template").html();
            var template = Handlebars.compile(source);
            var context = {filters: filters, hoverState: hoverState};
            var html    = template(context);
            $(".filter-css").html(template(context));
          },
          writeOverlay : function(myBlending, myGradient) {
            //writes the css filter to the dom
            var source   = $("#overlay-template").html();
            var template = Handlebars.compile(source);
            var context = {myBlending: myBlending, myGradient: myGradient};
            var html    = template(context);
            $(".overlay-css").html(template(context));
            console.log("writeOverlay");
          },
        },
        colorPicking : {
          updateColorPicker : function(target, destination) {
              //Updates the colorPicker swatch to match the color value in the text field.
              $(destination).spectrum("set", $(target).val());
          },
          updateColor : function(element, color) {
            $(element).val( (color ? color : "") );
            $(element).change();
            console.log("UpdateColor");
          },
          colorPick : function() {
 					 //New Spectrum code
 					 	$('#overlay-solid-color .color').spectrum({
 							preferredFormat: "rgb",
 					    showInput: true,
 							showAlpha: true,
 					    showPalette: false,
 							color: 'rgba(112,55,200, 0.4)',
 							move: function (color) { Engine.colorPicking.updateColor("#overlay-solid-color-text", color); },
 							hide: function (color) { Engine.colorPicking.updateColor("#overlay-solid-color-text", color); }
 						});
 						//overlay-linear-gradient color 1
 						$('#overlay-gradient-color1').spectrum({
 							preferredFormat: "rgb",
 					    showInput: true,
 							showAlpha: true,
 					    showPalette: false,
 							color: 'rgba(255, 0, 134, 0.4)',
 							move: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color1-text", color); },
 							hide: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color1-text", color); }
 						});
 						//overlay-linear-gradient color 2
 						$('#overlay-gradient-color2').spectrum({
 							preferredFormat: "rgb",
 					    showInput: true,
 							showAlpha: true,
 					    showPalette: false,
 							color: 'rgba(16, 255, 0, 0.4)',
 							move: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color2-text", color); },
 							hide: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color2-text", color); }
 						});

 						$('.overlay-solid-color').change(function() {
 							//console.log("solid");
 							var myGradient = $("#overlay-solid-color-text").val();
 							var myBlending = $("#blending-mode").val();
               console.log("overlay-solid-color:" + myGradient);
               Engine.template.writeOverlay(myBlending, myGradient);
 						});
             $('.overlay-gradient-color').change(function() {
               //console.log("gradient");
               var myColor1 = $("#overlay-gradient-color1-text").val();
               var myColor2 = $("#overlay-gradient-color2-text").val();
               var myBlending = $("#blending-mode").val();
               var orientation = $("#orientation").val();
               orientation = orientation.replace(/_/g," ");
               console.log("orientation:" + orientation);
               var myGradient = orientation + ","+ myColor1 +" 0%, "+ myColor2 +" 100%);";
               Engine.template.writeOverlay(myBlending, myGradient);
             });
 				 }
        },
        urlShare : {
          //URL var creation/parssing
          createURL : function() {
            //this changes the url on input changes
            $( "[data-urlname]" ).change(function() {
              var fullURL = "";
              var myURL = "";
              $("[data-urlname]").each(function() { //iterate though is variable
                var urlVarName = $(this).data("urlname");
                var myDefaultVal  = $(this).attr('value'); //get the default for comparison
                var myCurrentValue = $(this).val();  //get the current value
                if (myCurrentValue !== null) {
                  myCurrentValue = myCurrentValue.replace(/\s/g, ''); // remove spaces
                }

                myURL = urlVarName + "=" + myCurrentValue + "&" ;
                if ( $(this).is(':disabled') === false && $(this).is(':visible') ) { //only get the visible inputs
                  if (myCurrentValue !== myDefaultVal) { // make sure we're not stashing the default values into the URL since its messy :)
                  fullURL = fullURL + myURL;
                  }
                }
              });
              var radio = $("input[name=overlay]:checked").val();
              radio = radio.substring(1); // this has a # so let's kill that because URL Vars do not like #
              fullURL = "?" + fullURL  + "r=" + radio;
              window.history.replaceState(null, null, fullURL);
            });
          },
          getURL : function () {
            //on init page load, this script makes sure that the URL doesn't if contain variables
            var queries = {}; //object of URL vars
             $.each(document.location.search.substr(1).split('&'),function(c,q){ // http://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
               var i = q.split('=');
               queries[i[0].toString()] = i[1].toString();
             });
             var i = 0;
             $.each( queries, function( key, value ) {

               var className = "#sortable ." + key;
               var myObj = $(className);
               var classTarget = "#sortable li:eq(" + i + ")";
               if (i === 0 ) {
                $(myObj).parent().prepend(myObj);
                } else {
                $(myObj).insertBefore($(classTarget));
              }
               var classIndex = $(className).index();

              // if (key != "r") {
              //  }
                var query = "[data-urlname*='"  + key + "']"; //data attributes for both range & text input
                var query2 = "[data-pair*='"  + key + "']";
                $(query).val(value);
                $(query2).val(value);
                i = i + 1;
            });
            //r is shorthand for radio checkbox, if this has been set, then tag action to select the radio box for gradients
            if(window.location.href.indexOf("r=") > -1) {
             var newString =  String(queries.r);
              var myActiveOverlay = 'input[value="#' + newString + '"]';
              $(myActiveOverlay).prop("checked", true).change();
              Engine.colorPicking.updateColorPicker(".color1.text",  ".color1.picker" );
            }
            //no point in tryig to set the second color if it doesn't exist
            if(window.location.href.indexOf("c2=")> -1) {
              Engine.colorPicking.updateColorPicker(".color2.text",  ".color2.picker" );
            } else {
              Engine.colorPicking.updateColorPicker(".color1.text",  ".color.picker" ); //if there isn't a second color, then update the solid color picker
            }
             console.log(queries);
             $("#sepia-a").change();
          }
        },
        ui: {
          //The UI functionality
					sliders : function () {
						//on change events for sliders
						function slider(mySliderName){
							//follow naming scheme
							var filterName = $(mySliderName).data("filter");
							var mySliderNameA = "#" + filterName + "-a";
							var mySliderNameB ="#" +  filterName + "-b";
							//slider change
							$( mySliderNameA ).change(function() {
								var myval = $(this).val();
								$(mySliderNameB).val(myval);
							});
							//number change
							$(mySliderNameB).change(function() {
								var myval = $(this).val();
								$(mySliderNameA).val(myval);
							});
						}
						$( "input[data-filter]" ).each(function() {
							slider(this);

						});
					},
					onChangesEvents : function() {
						//when sliders are changed
            console.log("onChangesEvents");
						$("#contain input").change(function() {
							var filters = "";
							var hoverState = "";
							$( "input[type=range]" ).each(function() {
								var myCurrentVal = $(this).val(); // current
							 	var filterName = $(this).data("filter");
								var myDefaultVal  = $(this).attr('value'); //gets the default value of the input for use for hover state
								var dataAdditional = $(this).data("additional"); //appends the input data with suffix to relevant CSS
								if (dataAdditional === undefined) { //error handler
									dataAdditional = "";
								}
						    var concatMe =  filterName + "("+ myCurrentVal + dataAdditional +") ";
								var concatMehover = filterName + "(" + myDefaultVal + ") "; //hover state
                console.log("onChangesEvents " + myCurrentVal + " " + myDefaultVal);

								if ($(this).is(':disabled') === false && myDefaultVal !== myCurrentVal) {
									filters = filters + concatMe;
									hoverState = hoverState + concatMehover;
								}
						  });
              Engine.template.writeCSS(filters, hoverState);
						});
            $("#orientation").change(function() {
              $("#blending-mode").change();
            });
					},
					newimage : function (){
						//Super simple demo image swap
						$("a[data-fullsize]").click(function() {
                event.preventDefault(); //stop href from using anchor #
								var newUrl = $(this).data("fullsize");
								$("#demoimage").attr("src", newUrl);
								$(".preset img").attr("src", newUrl);
								console.log(newUrl);
						});
						//Replace the SRC of the demo image with the new URL to image in text field
						$("#imageURL").change(function() {
							var demoimage = $(this).val();
							$("#demoimage").attr("src", demoimage);
							$(".preset img").attr("src", demoimage);
              console.log("imageURL");
						});
					},
					showhidefilters : function (){
						//toggle the sliders/text box inputs to enable or disable filters
						$("label[data-filter]").click(function() {
							var myLabel = $(this);
							var myFilter = $(this).data("filter");
							myFilter = "input[data-filter="+ myFilter  + "]";

							if ($(myFilter).is(':disabled') === true) {
								$(myFilter).attr("disabled", false);
								 $("#sepia-a").change();
								 $(myLabel).removeClass("disabled");
							} else {
								$(myFilter).attr("disabled", true);
								$(myLabel).addClass("disabled");
								 $("#sepia-a").change();
							}
						});
					},
          reset : function() {
          //Return to every input to its default value
            $( "input[data-filter]" ).each(function() {
              var defaultVal = $(this).attr('value');
              $(this).val(defaultVal);
              Engine.ui.killOverlay(); //obliterate the Overlay
              $("#overlay-radio-none").prop("checked", true);
            });
            $("#sepia-a").change();
          },
					resetButton : function() {
						$("#reset").click(function() {
							Engine.ui.reset(); //trigger reset
						});
					},
					activeOverlay : function() {
						//New overlay functionality
            console.log("activeOverlay");
						$('input[type=radio][name=overlay]').change(function() {
							var myChecked = $("input[type=radio][name=overlay]:checked").val();
							if ( myChecked == "#overlay-radio-none") {
								Engine.ui.killOverlay();
							} else if ( myChecked == "#overlay-solid") {
                $('.overlay-group').hide();
								$(myChecked).css('display', 'inline-block');
								$("#blending-mode").css('display', 'block');
                $("#orientation").hide();
                $(".overlay-group input:visible").change();
              }  else {
								$('.overlay-group').hide();
								$(myChecked).css('display', 'inline-block');
								$("#blending-mode").css('display', 'block');
                $("#orientation").css('display', 'block');
								$(".overlay-group input:visible").change();
							}
						});
					},
          killOverlay : function (){
            console.log("killOverlay");
            $('.overlay-group').hide();
            $("#filter .overlay-css").html("");
            $("#overlay-css").html("");
            $("#blending-mode").hide();
            $("#orientation").hide();
          },
					sorting : function(){
            //https://github.com/RubaXa/Sortable
            var el = document.getElementById('sortable');
            var sortable = Sortable.create(el, {
              handle: ".updown",
              onUpdate: function (/**Event*/evt) {
                 $("#sepia-a").change();//dummy change to trigger change() events.
               }
            });

				 },

         changeSelect : function() {
           $("#orientation").change(function() {
              $("input[type=radio]").change();
           });
           $("#blending-mode").change(function(){
             $("input[type=radio]").change();
           });
         },
				 presetSet : function(filterName, newValue) {
					 //use for presets

					 var mySliderNameA = "#" + filterName + "-a";
					 var mySliderNameB ="#" +  filterName + "-b";
					 if (newValue !== undefined ) {
						 $(mySliderNameA).val(newValue);
						 $(mySliderNameB).val(newValue);
					 } else {
							newValue  = $(mySliderNameA).attr('value');
							$(mySliderNameA).val(newValue);
							$(mySliderNameB).val(newValue);
					 }
				 },
				 gradientCheck : function(obj) {
           // Used by presets to change the gradients
					 var gradient = $(obj).data("gradient");
           gradient = '[value="' + gradient + '"]';
					 $("input[name=overlay]").filter(gradient).prop("checked", true);
					 var color1 = $(obj).data("color1");
					 var color2 = $(obj).data("color2");
           var orientation = $(obj).data("orientation");
					 $(".overlay-group input.color1").val(color1);
					 $(".overlay-group input.color2").val(color2);
					 var blendingMode = $(obj).data("blending-mode");
           $("#blending-mode").val(blendingMode);
           $("#orientation").val(orientation);
           Engine.colorPicking.updateColorPicker(".overlay-group input.color1.text", ".overlay-group input.color1.picker");
           Engine.colorPicking.updateColorPicker(".overlay-group input.color2.text", ".overlay-group input.color2.picker");
           console.log("gradientCheck");
				 },
         flipDemoImage : function() {
           $(".css-tab").click(function() {
             console.log("Css-Tab");
             event.preventDefault();
             var el = $(this);
             if (el.text() == el.data("text-swap")) {
               el.text(el.data("text-original"));
               $(this).parent().removeClass("flip");
               $(".filter-parent").css("min-height", "100px");
             } else {
               el.data("text-original", el.text());
               el.text(el.data("text-swap"));
               $(this).parent().addClass("flip");
               Engine.ui.resizeheightcss();
             }
             $(".filter-parent").toggleClass("flip");

           });

         },
         tabbedInit : function() {
           //initializes bootstrap JS
           $('#myTabs a').click(function (e) {
             e.preventDefault();
             $(this).tab('show');
           });
         },
         resizeheightcss : function() {
           //This is fired on flip to ensure min height for the CSS code.
           var a = $(".titles-css").height();
           var b = $(".filter-css").height();
           var c = $(".overlay-css").height();
           var d = a + b + c + 30;
          console.log("Test me: " + d);
          $(".filter-parent").css("min-height", d);
         },
				 presets : function() {
					 $(".preset").click(function() {
             event.preventDefault(); //stop href from using anchor #
             Engine.ui.reset();
             var placed = {};
             placed = $(this).data();
             $.each( placed, function( key, value ) {
                Engine.ui.presetSet(key, value);
              });
						 Engine.ui.gradientCheck(this);
						 $("#sepia-a").change();//dummy change to trigger change() events.
						 $("input[type=radio]").change();//dummy change to trigger change() events.
					 });
				}
		} // ui
	}; // Engine
	Engine.ui.sliders();
	Engine.ui.onChangesEvents();
	Engine.ui.sorting();
	Engine.ui.showhidefilters();
	Engine.ui.resetButton();
	Engine.ui.presets();
	Engine.ui.newimage();
	Engine.ui.activeOverlay();
	Engine.colorPicking.colorPick();
  Engine.ui.flipDemoImage();
  Engine.ui.changeSelect();
  Engine.ui.tabbedInit();
  Engine.urlShare.createURL();
  Engine.urlShare.getURL();
});
}(jQuery));

//Scroll / load / scroll functions
/*
$( window ).resize(function() {
});
jQuery(window).load(function() {
});
jQuery(window).scroll(function() {
});
*/