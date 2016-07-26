(function(jQuery) {
  "use strict";
  var Engine;
    jQuery(document).ready(function() {
      Engine = {
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
							// ugly writes to DOM, to be replaced;
							$("#filter .filter-css").html("<p>" + ".myfilter { <p>&nbsp;&nbsp;&nbsp; filter: " + filters + ";</p> <p>&nbsp;&nbsp;&nbsp; -webkit-filter: " + filters +  ";  <p>&nbsp;&nbsp;&nbsp; -moz-filter: " + filters + "; <p>&nbsp;&nbsp;&nbsp; }");
							$("#inlinestyle").html("<style> #filter-wrapper:hover {"+ "filter: " + hoverState + " !important; -webkit-filter: " + hoverState + " !important;  -moz-filter: " + hoverState + " !important;" +"}</style>")
							$("#filter-wrapper").attr("style", "filter: " + filters + "; -webkit-filter: " + filters + ";  -moz-filter: " + filters + ";");
							$("img[data-fullsize]").attr("style", "filter: " + filters + "; -webkit-filter: " + filters + ";  -moz-filter: " + filters + ";");
							if ( $("#overlay-radio-none").prop("checked") ) {
								$("#filter .overlay-css").html("");
							   $("#overlay-css").html("");
							}
						});
					},
					newimage : function (){
						//Super simple demo image swap
						$("img[data-fullsize]").click(function() {
								var newUrl = $(this).data("fullsize");
								$("#demoimage").attr("src", newUrl);
								$(".preset img").attr("src", newUrl);
								console.log(newUrl);
						});
						//Replace the SRC of the demo image with the new URL to image
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
							console.log("soild");
							var myColor = $("#overlay-solid-color-text").val();
							var myBlending = $("#blending-mode").val();
							//ugly writes to the DOM
							$("#filter .overlay-css").html("<p>" + ".myfilter {<p>&nbsp;&nbsp;&nbsp;position:relative; <p>} <p>.myfilter:after{ <p>&nbsp;&nbsp;&nbsp; content: ''; <p>&nbsp;&nbsp;&nbsp; display: block;  <p>&nbsp;&nbsp;&nbsp;  top: 0;  <p>&nbsp;&nbsp;&nbsp;  left: 0;  <p>&nbsp;&nbsp;&nbsp;  height: 100%;  <p>&nbsp;&nbsp;&nbsp;  width: 100%;  <p>&nbsp;&nbsp;&nbsp; position: absolute;  <p>&nbsp;&nbsp;&nbsp; background-color:" + myColor + ";  <p>&nbsp;&nbsp;&nbsp; mix-blend-mode: " + myBlending + "; <p> }");
              var myHover = "<style>#filter-wrapper:hover:after {opacity: 0;}</style>";
              myColor = "<style>#filter-wrapper:after{ background-color:" + myColor +"; mix-blend-mode: "  + myBlending + "; }</style>";
							$("#overlay-css").html(myColor  + myHover);
						});

						$('.overlay-linear-gradient-color').change(function() {
							console.log("gradient");
							var myColor1 = $("#overlay-linear-gradient-color1-text").val();
							var myColor2 = $("#overlay-linear-gradient-color2-text").val();
							var myBlending = $("#blending-mode").val();
							var myGradient = "linear-gradient(to bottom,"+ myColor1 +" 0%, "+ myColor2 +" 100%);"
							//ugly writes to the DOM
							$("#filter .overlay-css").html("<p>" + ".myfilter {<p>&nbsp;&nbsp;&nbsp;position:relative; <p>} <p>.myfilter:after{ <p>&nbsp;&nbsp;&nbsp; content: ''; <p>&nbsp;&nbsp;&nbsp; display: block;  <p>&nbsp;&nbsp;&nbsp;  top: 0;  <p>&nbsp;&nbsp;&nbsp;  left: 0;  <p>&nbsp;&nbsp;&nbsp;  height: 100%;  <p>&nbsp;&nbsp;&nbsp;  width: 100%;  <p>&nbsp;&nbsp;&nbsp; position: absolute;  <p>&nbsp;&nbsp;&nbsp; background:" + myGradient + ";  <p>&nbsp;&nbsp;&nbsp; mix-blend-mode: " + myBlending + "; <p> }");
              var myHover = "<style>#filter-wrapper:hover:after {opacity: 0;}</style>";
            	myGradient = "<style>#filter-wrapper:after{ background:" + myGradient +"; mix-blend-mode: "  + myBlending + "; }</style>";

							$("#overlay-css").html(myGradient + myHover);
						});

						$('.overlay-radial-gradient-color').change(function() {
							console.log("radial");
							var myColor1x = $("#overlay-radial-gradient-color1-text").val();
							var myColor2x = $("#overlay-radial-gradient-color2-text").val();
							var myBlending = $("#blending-mode").val();
							var myGradient = "radial-gradient(ellipse at center, " + myColor1x +" 0%, "+ myColor2x +" 100%);"
							//ugly writes to the DOM
							$("#filter .overlay-css").html("<p>" + ".myfilter {<p>&nbsp;&nbsp;&nbsp;position:relative; <p>} <p>.myfilter:after{ <p>&nbsp;&nbsp;&nbsp; content: ''; <p>&nbsp;&nbsp;&nbsp; display: block;  <p>&nbsp;&nbsp;&nbsp;  top: 0;  <p>&nbsp;&nbsp;&nbsp;  left: 0;  <p>&nbsp;&nbsp;&nbsp;  height: 100%;  <p>&nbsp;&nbsp;&nbsp;  width: 100%;  <p>&nbsp;&nbsp;&nbsp; position: absolute;  <p>&nbsp;&nbsp;&nbsp; background:" + myGradient + ";  <p>&nbsp;&nbsp;&nbsp; mix-blend-mode: " + myBlending + "; <p> }");
              var myHover = "<style>#filter-wrapper:hover:after {opacity: 0;}</style>";
            	myGradient = "<style>#filter-wrapper:after{ background:" + myGradient +"; mix-blend-mode: "  + myBlending + "; }</style>";
							$("#overlay-css").html(myGradient + myHover);
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

				 },
         updateColorPicker : function(target, destination) {
           $(target).change(function() {
             $(destination).spectrum("set", $(target).val());
           });
         },
         updateColor : function(element, color) {
           $(element).val( (color ? color : "") );
           $(element).change();
         },
				 presets : function() {
					 $(".preset").click(function() {
						 //eventually I'd like to simplify this to programmically cycle through the list of filters
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
						 $("#sepia-a").change();
						 $("input[type=radio]").change();
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
  Engine.ui.updateColorPicker(".overlay-group input.color1.text", ".overlay-group input.color1.picker");
  Engine.ui.updateColorPicker(".overlay-group input.color2.text", ".overlay-group input.color2.picker");
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
