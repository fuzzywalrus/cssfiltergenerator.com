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
          },
        },
        urlShare : {

        },
        ui: {
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
          createURL : function() {
            //this changes the url on input changes
            $( "[data-urlname]" ).change(function() {
              var fullURL = "";
              var myURL = "";
              $("[data-urlname]").each(function() { //iterate though is variable
                var urlVarName = $(this).data("urlname");
                var myDefaultVal  = $(this).attr('value'); //get the default for comparison
                var myCurrentValue = $(this).val();  //get the current value
                var myValue = myCurrentValue.replace(/\s/g, ''); // remove spaces
                myURL = urlVarName + "=" + myValue + "&" ;
                if ( $(this).is(':disabled') === false && $(this).is(':visible') ) { //only get the visible inputs
                  if (myCurrentValue !== myDefaultVal) { // make sure we're not stashing the default values into the URL since its messy :)
                    fullURL = myURL + fullURL;
                  }
                }
              });
              var radio = $("input[name=overlay]:checked").val();
              radio = radio.substring(1); // this has a # so let's kill that because URL Vars do not like #
              fullURL = "?" + fullURL  + "r=" + radio;
              //fullURL = fullURL.slice(0, -1);
              window.history.replaceState(null, null, fullURL);
            });
          },
          getURL : function () {
            //on init page load, this script makes sure that the URL doesn't if contain variables
            var queries = {};
             $.each(document.location.search.substr(1).split('&'),function(c,q){
               var i = q.split('=');
               queries[i[0].toString()] = i[1].toString();
             });
             $.each( queries, function( key, value ) {
                var query = "[data-urlname*='"  + key + "']";
                var query2 = "[data-pair*='"  + key + "']";
                console.log(query +" "+ value);
                $(query).val(value);
                $(query2).val(value);
                //$("#sepia-b").change();
            });
            if(window.location.href.indexOf("r=") > -1) {
             var newString =  String(queries["r"]);
              var myActiveOverlay = 'input[value="#' + newString + '"]';
              console.log(myActiveOverlay);
              $(myActiveOverlay).prop("checked", true).change();
              Engine.ui.updateColorPicker(".color1.text",  ".color1.picker" );

            }
            if(window.location.href.indexOf("c2=")> -1) {
              Engine.ui.updateColorPicker(".color2.text",  ".color2.picker" );
            }
             console.log(queries);
             $("#sepia-a").change();

          },

					onChangesEvents : function() {
						//when sliders are changed
						$("#contain input").change(function() {
							var filters = "";
							var hoverState = "";
							$( "input[type=range]" ).each(function() {
								var myValue = $(this).val();
							 	var filterName = $(this).data("filter");
								var myDefaultVal  = $(this).attr('value'); //gets the default value of the input for use for hover state
								var dataAdditional = $(this).data("additional"); //appends the input data with suffix to relevant CSS
								if (dataAdditional == undefined) { //error handler
									dataAdditional = "";
								}
						    var concatMe =  filterName + "("+ myValue + dataAdditional +") ";
								var concatMehover = filterName + "(" + myDefaultVal + ") "; //hover state
								if ($(this).is(':disabled') === false) {
									filters = filters + concatMe;
									hoverState = hoverState + concatMehover;
								}
						  });
              Engine.template.writeCSS(filters, hoverState);
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
						});
					},
					showhidefilters : function (){
						//toggle the sliders/text box inputs to enable or disable filters
						$("label").click(function() {
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
						$("#reset").click(function() {
							$( "input[data-filter]" ).each(function() {
								var defaultVal = $(this).attr('value');
								$(this).val(defaultVal);
                Engine.ui.killOverlay();
                $("#overlay-radio-none").prop("checked", true);
							});
								$("#sepia-a").change();
						});
					},
					activeOverlay : function() {
						//New overlay functionality
						$('input[type=radio][name=overlay]').change(function() {
							var myChecked = $("input[type=radio][name=overlay]:checked").val();
							if ( myChecked == "#overlay-radio-none") {
								Engine.ui.killOverlay();
							} else {
								$('.overlay-group').hide();
								$(myChecked).css('display', 'inline-block');
								$("#blending-mode").css('display', 'inline-block');
								$(".overlay-group input:visible").change();
							}
						});
					},
          killOverlay : function (){
            $('.overlay-group').hide();
            $("#filter .overlay-css").html("");
            $("#overlay-css").html("");
            $("#blending-mode").hide();
          },
					sorting : function(){
						//jQuery UI init
						$( "#sortable" ).sortable({
							axis: "y",
							containment:  "#contain",
							scroll: false,
							stop:  function(event, ui) {
								$("#sepia-a").change();
						 }
					 });
				 },
				 colorPick : function() {
					 //New Spectrum code
					 	$('#overlay-solid-color .color').spectrum({
							preferredFormat: "rgb",
					    showInput: true,
							showAlpha: true,
					    showPalette: false,
							color: 'rgba(112,55,200, 0.4)',
							move: function (color) { Engine.ui.updateColor("#overlay-solid-color-text", color); },
							hide: function (color) { Engine.ui.updateColor("#overlay-solid-color-text", color); }
						});
						//overlay-linear-gradient color 1
						$('#overlay-linear-gradient-color1').spectrum({
							preferredFormat: "rgb",
					    showInput: true,
							showAlpha: true,
					    showPalette: false,
							color: 'rgba(255, 0, 134, 0.4)',
							move: function (color) { Engine.ui.updateColor("#overlay-linear-gradient-color1-text", color); },
							hide: function (color) { Engine.ui.updateColor("#overlay-linear-gradient-color1-text", color); }
						});
						//overlay-linear-gradient color 2
						$('#overlay-linear-gradient-color2').spectrum({
							preferredFormat: "rgb",
					    showInput: true,
							showAlpha: true,
					    showPalette: false,
							color: 'rgba(16, 255, 0, 0.4)',
							move: function (color) { Engine.ui.updateColor("#overlay-linear-gradient-color2-text", color); },
							hide: function (color) { Engine.ui.updateColor("#overlay-linear-gradient-color2-text", color); }
						});
						//overlay-linear-gradient color 1
						$('#overlay-radial-gradient-color1').spectrum({
							preferredFormat: "rgb",
					    showInput: true,
							showAlpha: true,
					    showPalette: false,
							color: 'rgba(100, 10, 10, 0.9)',
							move: function (color) { Engine.ui.updateColor("#overlay-radial-gradient-color1-text", color); },
							hide: function (color) { Engine.ui.updateColor("#overlay-radial-gradient-color1-text", color); }
						});
						//overlay-linear-gradient color 2
						$('#overlay-radial-gradient-color2').spectrum({
							preferredFormat: "rgb",
					    showInput: true,
							showAlpha: true,
					    showPalette: false,
							color: 'rgba(83, 10, 100, 0.9)',
							move: function (color) { Engine.ui.updateColor("#overlay-radial-gradient-color2-text", color); },
							hide: function (color) { Engine.ui.updateColor("#overlay-radial-gradient-color2-text", color); }
						});

						$('.overlay-solid-color').change(function() {
							//console.log("solid");
							var myGradient = $("#overlay-solid-color-text").val();
							var myBlending = $("#blending-mode").val();
              Engine.template.writeOverlay(myBlending, myGradient);
						});

						$('.overlay-linear-gradient-color').change(function() {
							//console.log("gradient");
							var myColor1 = $("#overlay-linear-gradient-color1-text").val();
							var myColor2 = $("#overlay-linear-gradient-color2-text").val();
							var myBlending = $("#blending-mode").val();
							var myGradient = "linear-gradient(to bottom,"+ myColor1 +" 0%, "+ myColor2 +" 100%);"
              Engine.template.writeOverlay(myBlending, myGradient);
						});

						$('.overlay-radial-gradient-color').change(function() {
							//console.log("radial");
							var myColor1x = $("#overlay-radial-gradient-color1-text").val();
							var myColor2x = $("#overlay-radial-gradient-color2-text").val();
							var myBlending = $("#blending-mode").val();
							var myGradient = "radial-gradient(ellipse at center, " + myColor1x +" 0%, "+ myColor2x +" 100%);"
              Engine.template.writeOverlay(myBlending, myGradient);
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
           // Used by presents to change the gradients
					 var gradient = $(obj).data("gradient");
           gradient = '[value="' + gradient + '"]';
					 $("input[name=overlay]").filter(gradient).prop("checked", true)
					 var color1 = $(obj).data("color1");
					 var color2 = $(obj).data("color2");
					 $(".overlay-group input.color1").val(color1);
					 $(".overlay-group input.color2").val(color2);
					 var blendingMode = $(obj).data("blending-mode");
           $("#blending-mode").val(blendingMode);
           Engine.ui.updateColorPicker(".overlay-group input.color1.text", ".overlay-group input.color1.picker");
           Engine.ui.updateColorPicker(".overlay-group input.color2.text", ".overlay-group input.color2.picker");
				 },
         updateColorPicker : function(target, destination) {
             //Updates the colorPicker swatch to match the color value in the text field.
             $(destination).spectrum("set", $(target).val());
         },
         updateColor : function(element, color) {
           $(element).val( (color ? color : "") );
           $(element).change();
         },
         flipDemoImage : function() {
           $(".css-tab").click(function() {
             event.preventDefault();
             var el = $(this);
             if (el.text() == el.data("text-swap")) {
               el.text(el.data("text-original"));
             } else {
               el.data("text-original", el.text());
               el.text(el.data("text-swap"));
             }
             $(".filter-parent").toggleClass("flip");
           });
         },
				 presets : function() {
					 $(".preset").click(function() {
						 //eventually I'd like to simplify this to programmically cycle through the list of filters
             event.preventDefault(); //stop href from using anchor #
						 var myBrightness = $(this).data("brightness");
						 Engine.ui.presetSet("brightness", myBrightness);
						 var myContrast = $(this).data("contrast");
						 Engine.ui.presetSet("contrast", myContrast);
						 var myGrayscale = $(this).data("grayscale");
						 Engine.ui.presetSet("grayscale", myGrayscale);
						 var myHuerotate = $(this).data("huerotate");
						 Engine.ui.presetSet("hue-rotate", myHuerotate);
						 var mySaturate = $(this).data("saturate");
						 Engine.ui.presetSet("saturate", mySaturate);
						 var mySepia = $(this).data("sepia");
						 Engine.ui.presetSet("sepia", mySepia);
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
	Engine.ui.reset();
	Engine.ui.presets();
	Engine.ui.newimage();
	Engine.ui.activeOverlay();
	Engine.ui.colorPick();
  Engine.ui.createURL();
  Engine.ui.getURL();
  Engine.ui.flipDemoImage();
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
