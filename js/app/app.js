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
						//Replace the SRC of the demo image with the new URL to image
						$("#imageURL").change(function() {
							var demoimage = $(this).val();
							$("#demoimage").attr("src", demoimage);
						});
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
							// ugly writes to DOM
							$("#filter span").html("<p>" + "filter: " + filters + ";</p> <p> -webkit-filter: " + filters +  ";  <p> -moz-filter: " + filters + ";");
							$("#inlinestyle").html("<style> #filter-wrapper:hover {"+ "filter: " + hoverState + " !important; -webkit-filter: " + hoverState + " !important;  -moz-filter: " + hoverState + " !important;" +"}</style>")
							$("#filter-wrapper").attr("style", "filter: " + filters + "; -webkit-filter: " + filters + ";  -moz-filter: " + filters + ";");
							$("img[data-fullsize]").attr("style", "filter: " + filters + "; -webkit-filter: " + filters + ";  -moz-filter: " + filters + ";");
						});
					},
					newimage : function (){
						//Super simple demo image swap
						$("img[data-fullsize]").click(function() {
								var newUrl = $(this).data("fullsize");
								$("#demoimage").attr("src", newUrl);
									console.log(newUrl);
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
							});
								$("#sepia-a").change();
						});
					},
					activeOverlay : function() {
						//New overlay functionality
						$('input[type=radio][name=overlay]').change(function() {
							var myChecked = $("input[type=radio][name=overlay]:checked").val();
							if ( myChecked == "none") {
								$('.overlay-group').hide();
							} else {
								$('.overlay-group').hide();
								$(myChecked).show();
							}
						});
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
							color: 'rgba(112,55,200, 0.2)',
							move: function (color) { updateColor("#overlay-solid-color-text", color); },
							hide: function (color) { updateColor("#overlay-solid-color-text", color); }
						});
						function updateColor(element, color) {
			 				$(element).val( (color ? color : "") );
							$(element).change();
						}
						$('.overlay-solid-color').change(function() {
							console.log("Yes");
							var myColor = $("#overlay-solid-color-text").val();
							var myBlending = $("#blending-mode").val();
							myColor = "<style>#filter-wrapper:after{ background-color:" + myColor +"; mix-blend-mode: "  + myBlending + "; }</style>";
							$("#overlay-css").html(myColor)
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
						 $("#sepia-a").change();
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
