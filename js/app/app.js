(function(jQuery) {
  "use strict";
  var Engine;
    jQuery(document).ready(function() {
      Engine = {
        ui: {
					sliders : function () {
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
					onchanges : function() {
						$("#imageURL").change(function() {
							var demoimage = $(this).val();
							$("#demoimage").attr("src", demoimage);
						});

						$("#contain input").change(function() {
							var filters = "";
							var hoverState = "";
							$( "input[type=range]" ).each(function() {
								var myValue = $(this).val();
							 	var filterName = $(this).data("filter");
								var myDefaultVal  = $(this).attr('value');
								var dataAdditional = $(this).data("additional"); //
								if (dataAdditional == undefined) {
									dataAdditional = "";
								}
						    var concatMe =  filterName + "("+ myValue + dataAdditional +") ";
								var concatMehover = filterName + "(" + myDefaultVal + ") ";
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
						$("img[data-fullsize]").click(function() {

								var newUrl = $(this).data("fullsize");
								$("#demoimage").attr("src", newUrl);
									console.log(newUrl);
						});
					},
					showhidefilters : function (){
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
						$("#reset").click(function() {
							$( "input[data-filter]" ).each(function() {
								var defaultVal = $(this).attr('value');
								$(this).val(defaultVal);
							});
								$("#sepia-a").change();
						});
					},
					activeOverlay : function() {
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

							//$("#overlay-css$('#cp1').change(function() {console.log("Yes");});").html(myColor);

						});

						// $('#cp1').change(function() {console.log("Yes");});
				 },
				 presetSet : function(filterName, newValue) {

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
	Engine.ui.onchanges();
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
