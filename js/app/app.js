(function(jQuery) {
  "use strict";
  var Engine;
  jQuery(document).ready(function() {
      Engine = {
        defaults: {
          blur: {
            defaultValue: 0,
            cssname: "blur",
            suffix: "px"
          },
          brightness: {
            defaultValue: 1,
            cssname: "brightness",
            suffix: "",
          },
          contrast: {
            defaultValue: 1,
            cssname: "contrast",
            suffix: "",
          },
          grayscale: {
            defaultValue: 0,
            cssname: "grayscale",
            suffix: ""
          },
          huerotate: {
            defaultValue: 0,
            cssname: "hue-rotate",
            suffix: "deg"
          },
          invert: {
            defaultValue: 0,
            cssname: "invert",
            suffix: ""
          },
          opacity: {
            defaultValue: 1,
            cssname: "opacity",
            suffix: ""
          },
          saturate: {
            defaultValue: 1,
            cssname: "saturate",
            suffix: ""
          },
          sepia: {
            defaultValue: 0,
            cssname: "sepia",
            suffix: ""
          },
        },
        data : {
          // default values never change
          filters: {
            blur : {
              active: true,
              value: 0,
              position: 0
            },
            brightness: {
              active: true,
              value: 1,
              position: 1
            },
            contrast: {
              active: true,
              value: 1,
              position: 2
            },
            grayscale: {
              active: true,
              value: 0,
              position: 3
            },
            huerotate: {
              active: true,
              value: 0,
              position: 4
            },
            invert: {
              active: true,
              value: 0,
              position: 5
            },
            opacity: {
              active: true,
              value: 1,
              position: 6
            },
            saturate: {
              active: true,
              value: 1,
              position: 7
            },
            sepia: {
              active: true,
              value: 0,
              position: 8
            },
          },
          overlay: {
            color0: "rgba(62, 162, 253, 0.4)",
            color1: "rgba(62, 162, 253, 0.4)",
            color2: "rgba(2, 122, 233, 0.8)",
            select: "#overlay-radio-none",
            blend: "multiply",
            gradientOrientation: "linear-gradient(to right"
          },
          updater : function () {
            // This writes the input value of the numeric input into the data object's corrosponding filter.
            $("[data-filter]").change(function() {
              console.log(Engine);
              var objName = $(this).data("filter");
              Engine.data.filters[objName].value = $(this).val();
              console.log(Engine.data);
              Engine.urlShare.createURL();
            });
              // This writes the on/off value of the checkbox (switch) input into the data object's corrosponding filter.
            $(".onoffswitch-checkbox").change(function(){
              var objName = $(this).data("forfilter");
              if ( Engine.data.filters[objName].active === true) {
                Engine.data.filters[objName].active = false;
              } else {
                Engine.data.filters[objName].active = true;
              }
              Engine.data.filters[objName].active = $(this).prop("checked");
              Engine.urlShare.createURL();
            });
            //overlay change
            $('[name="overlay"]').change(function() {
                Engine.data.overlay.select = $(this).val();
                console.log(Engine.data);
            });
            $('.overlay-group input').change(function() {
              Engine.data.overlay.color0 = $("#overlay-solid-color-text").val();
              console.log("  Engine.data.overlay.color0 " +   Engine.data.overlay.color0);
              Engine.data.overlay.color1 = $("#overlay-gradient-color1-text").val();
              Engine.data.overlay.color2  = $("#overlay-gradient-color2-text").val();
              Engine.data.overlay.blend = $("#blending-mode").val();
              Engine.data.overlay.orientation = $("#orientation").val();
              //Engine.data.overlay.orientation = Engine.data.overlay.orientation.replace(/_/g," ");
            });
            //when solid color is changed
            $('.overlay-solid-color').change(function() {
               Engine.template.writeOverlay(Engine.data.overlay.blend, Engine.data.overlay.color0 );
            });
            //when gradient colors are changed
             $('.overlay-gradient-color').change(function() {
               var myGradient =  Engine.data.overlay.orientation + ","+ Engine.data.overlay.color1 +" 0%, "+ Engine.data.overlay.color2 +" 100%);";
               Engine.template.writeOverlay(Engine.data.overlay.blend, myGradient);
             });
             //when sliders are changed
             $("#contain input").change(function() {
              var filters = "",
                  hoverState = "";
               Object.keys(Engine.data.filters).forEach(function(key) {
                 if (Engine.data.filters[key].value != Engine.defaults[key].defaultValue && Engine.data.filters[key].active === true) {
                   filters = filters +  Engine.defaults[key].cssname + "("+ Engine.data.filters[key].value + Engine.defaults[key].suffix  +") ";
                   hoverState = Engine.defaults[key].cssname + "(" + Engine.defaults[key].defaultValue + ") ";
                 }
                 Engine.template.writeCSS(filters, hoverState);
               });
            });
             $("#orientation").change(function() {
               $("#blending-mode").change();
             });
          },
          positioner : function () {
            // this writes the value of the position to each corrosponding filter
            $('input[data-filter][type="number"]').each(function( index, element ) {
              var objName = $(element).data("filter");
              //console.log("index " + index + ", " + element + ", " + objName);
              Engine.data.filters[objName].position = index;
            });
          },


        },
        init: function() {
          //first run
          Engine.data.updater();
          Engine.data.positioner();
        },
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
 					 //New Spectrum code, this initializes all instanes of spectrum
 					 	$('#overlay-solid-color .color').spectrum({
 							preferredFormat: "rgb",
 					    showInput: true,
 							showAlpha: true,
 					    showPalette: false,
 							color: 'rgba(112,55,200, 0.4)',
 							move: function (color) { Engine.colorPicking.updateColor("#overlay-solid-color-text", color); },
 							hide: function (color) { Engine.colorPicking.updateColor("#overlay-solid-color-text", color); }
 						});
 						//overlay-linear-gradient color 1 init
 						$('#overlay-gradient-color1').spectrum({
 							preferredFormat: "rgb",
 					    showInput: true,
 							showAlpha: true,
 					    showPalette: false,
 							color: 'rgba(255, 0, 134, 0.4)',
 							move: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color1-text", color); },
 							hide: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color1-text", color); }
 						});
 						//overlay-linear-gradient color 2 init
 						$('#overlay-gradient-color2').spectrum({
 							preferredFormat: "rgb",
 					    showInput: true,
 							showAlpha: true,
 					    showPalette: false,
 							color: 'rgba(16, 255, 0, 0.4)',
 							move: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color2-text", color); },
 							hide: function (color) { Engine.colorPicking.updateColor("#overlay-gradient-color2-text", color); }
 						});
 				 }
        },
        urlShare : {
          //URL var creation/parssing uses jsurl.js
          //https://github.com/Sage/jsurl/
          createURL : function() {
            //creates the url on input changes
              var myURL = "?" + JSURL.stringify(Engine.data);
              window.history.replaceState(null, null,  myURL);
          },
          getURL : function () {
            var myURL = null,
                filters,
                hoverState;
            myURL = JSURL.parse( document.location.search.substring(1) ); // remove ? mark & parse
            console.log("myURL");
            console.log(myURL);
            if (myURL !== null && myURL !== "" ) {
              Engine.data = myURL;
              Object.keys(Engine.data.filters).forEach(function(key) {
                if (Engine.data.filters[key].value !== Engine.defaults[key].defaultValue && Engine.data.filters[key].active === true) {
                  filters = filters +  Engine.defaults[key].cssname + "("+ Engine.data.filters[key].value + Engine.defaults[key].suffix  +") ";
                  hoverState = Engine.defaults[key].cssname + "(" + Engine.defaults[key].defaultValue + ") ";
                  $('input[data-filter="'  + key + '"]').val( Engine.data.filters[key].value );
                }
                if (Engine.data.filters[key].active === false) {
                  $('input[data-filter="'  + key + '"]').val( Engine.data.filters[key].value );
                  $('input[data-forfilter="'  + key + '"]').prop("checked", Engine.data.filters[key].active );
                }

              Engine.template.writeCSS(filters, hoverState);
              });
              if (Engine.data.overlay.select !== "#overlay-radio-none") {
                $("#overlay-solid-color-text").val(  Engine.data.overlay.color0 );
                $("#overlay-gradient-color1-text").val(Engine.data.overlay.color1);
                $("#overlay-gradient-color2-text").val(Engine.data.overlay.color2);
                $('#overlay-solid-color .color').spectrum({ color: Engine.data.overlay.color0 });
                $('#overlay-gradient-color1').spectrum({ color: Engine.data.overlay.color1 });
                $('#overlay-gradient-color2').spectrum({ color: Engine.data.overlay.color2 });
                $("#blending-mode").val(Engine.data.overlay.blend);
                $("#orientation").val(Engine.data.overlay.orientation);
                $('[value="'+Engine.data.overlay.select+'"]').click();
              }
              //Engine.ui.gradientCheck(Engine.data.overlay);
              /* Object.keys(Engine.data.overlay).forEach(function(key) {
                Engine.data.overlay[key]
              }); */
            $("#sepia-a").change();
            }
          }
        },
        ui: {
          //The UI functionality
					sliders : function () {
						//on change events for sliders
            $("[data-filter]").change(function() {
              $("[data-filter='" + $(this).data("filter") + "']").val( $(this).val() );
            });
					},
					newimage : function (){
						//Super simple demo image swap
						$("a[data-fullsize]").click(function() {
                event.preventDefault(); //stop href from using anchor #
								var newUrl = $(this).data("fullsize");
								$("#demoimage").attr("src", newUrl);
								$(".preset img").attr("src", newUrl);
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
						$("label[data-filter]").click(function() {
							var myLabel = $(this),
							    myFilter = "input[data-filter="+ $(this).data("filter")  + "]";

							if ($(myFilter).is(':disabled') === true) {
								$(myFilter).attr("disabled", false).removeClass("disabled");
								 $("#sepia-a").change();
							} else {
								$(myFilter).attr("disabled", true).addClass("disabled");
								 $("#sepia-a").change();
							}
						});
					},
          reset : function() {
            //Return to every input to its default value
            Object.keys(Engine.data.filters).forEach(function(key) {
              Engine.data.filters[key].value = Engine.defaults[key].defaultValue;
              $('input[data-filter="'  + key + '"]').data(filter, Engine.defaults[key].defaultValue);

            });
              $("#sepia-a").change();
              Engine.ui.killOverlay(); //obliterate the Overlay
            },
  					resetButton : function() {
  						$("#reset").click(function() {
  							Engine.ui.reset(); //trigger reset
                window.history.replaceState(null, null,  "/");
  						});
					},
					activeOverlay : function() {
						//New overlay functionality
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
                  Engine.data.filters.positioner();
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
				 presetSet : function(key, newValue) {
					 //use for presets
           console.log("key " + key + " New Value " + newValue);
					 if (newValue !== undefined ) {
						 $("input[data-filter="+ key  + "]").val(newValue);
					 } else {
							newValue  = $(mySliderNameA).attr('value');
							$("input[data-filter="+ key  + "]").val(newValue);
					 }
           $("input[type=radio]").change();
				 },
				 gradientCheck : function(obj) {
           //used for presets only
           Engine.data.overlay.color1 = $(obj).data("color1");
           Engine.data.overlay.color2 = $(obj).data("color2");
           Engine.data.overlay.select = $(obj).data("gradient");
           Engine.data.overlay.gradientOrientation = $(obj).data("orientation");
           Engine.data.overlay.blend = $(obj).data("blending-mode");
					 $("input[name=overlay]").filter('[value="' +  Engine.data.overlay.select  + '"]').prop("checked", true);
					 $(".overlay-group input.color1").val(Engine.data.overlay.color1);
					 $(".overlay-group input.color2").val(Engine.data.overlay.color2);
           $("#blending-mode").val( Engine.data.overlay.blend);
           $("#orientation").val(Engine.data.overlay.gradientOrientation);
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
          $(".filter-parent").css("min-height", (
            $(".titles-css").height() + $(".filter-css").height() + $(".overlay-css").height() + 30
          ));
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
  Engine.init();

	Engine.ui.sliders();
	Engine.ui.sorting();
	Engine.ui.showhidefilters();
	Engine.ui.resetButton();
	Engine.ui.presets();
	Engine.ui.newimage();
	Engine.ui.activeOverlay();
  Engine.ui.flipDemoImage();
  Engine.ui.changeSelect();
  Engine.ui.tabbedInit();
  Engine.colorPicking.colorPick();
  Engine.urlShare.getURL();

  console.log (Engine.data);
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
