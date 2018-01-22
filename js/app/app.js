(function(jQuery) {
  "use strict";
  var Engine;
    jQuery(document).ready(function() {
      Engine = {
        data : {
          filters: {
            // default values never change
            blur : {
              active: true,
              defaultValue:  0,
              value: 0,
              cssname: "blur",
              suffix: "px",
              position: 0
            },
            brightness: {
              active: true,
              defaultValue: 1,
              value: 1,
              cssname: "brightness",
              suffix: "",
              position: 1
            },
            contrast: {
              active: true,
              value: 1,
              defaultValue: 1,
              cssname: "contrast",
              suffix: "",
              position: 2
            },
            grayscale: {
              active: true,
              value: 0,
              defaultValue: 0,
              cssname: "grayscale",
              suffix: "",
              position: 3
            },
            huerotate: {
              active: true,
              value: 0,
              defaultValue: 0,
              cssname: "hue-rotate",
              suffix: "deg",
              position: 4
            },
            invert: {
              active: true,
              value: 0,
              defaultValue: 0,
              cssname: "invert",
              suffix: "",
              position: 5
            },
            opacity: {
              active: true,
              value: 1,
              defaultValue: 1,
              cssname: "opacity",
              suffix: "",
              position: 6
            },
            saturate: {
              active: true,
              value: 1,
              defaultValue: 1,
              cssname: "saturate",
              suffix: "",
              position: 7
            },
            sepia: {
              active: true,
              value: 0,
              defaultValue: 0,
              cssname: "sepia",
              suffix: "",
              position: 8
            }
          },
          updater : function () {
            // This writes the input value of the numeric input into the data object's corrosponding filter.
            $("[data-filter]").change(function() {
              var objName = $(this).data("filter");
              Engine.data.filters[objName].value = $(this).val();
              console.log(Engine.data);
              Engine.urlShare.createURL();
            });
              // This writes the on/off value of the checkbox (switch) input into the data object's corrosponding filter.
            $(".onoffswitch-checkbox").change(function(){
              var objName = $(this).data("forfilter");
              Engine.data.filters[objName].active = $(this).prop("checked");
              console.log(Engine.data);
            });
            //overlay change
            $('[name="overlay"]').change(function() {
                Engine.data.overlay.type = $(this).val();
                console.log(Engine.data);
            });
            $('.overlay-group input').change(function() {
              Engine.data.overlay.color0 = $("#overlay-solid-color-text").val();
              console.log("  Engine.data.overlay.color0 " +   Engine.data.overlay.color0);
              Engine.data.overlay.color1 = $("#overlay-gradient-color1-text").val();
              Engine.data.overlay.color2  = $("#overlay-gradient-color2-text").val();
              Engine.data.overlay.blend = $("#blending-mode").val();
              Engine.data.overlay.orientation = $("#orientation").val();
              Engine.data.overlay.orientation = Engine.data.overlay.orientation.replace(/_/g," ");
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
                 if (Engine.data.filters[key].value != Engine.data.filters[key].defaultValue && Engine.data.filters[key].active === true) {

                   filters = filters +  Engine.data.filters[key].cssname + "("+ Engine.data.filters[key].value + Engine.data.filters[key].suffix  +") ";
                   hoverState = Engine.data.filters[key].cssname + "(" + Engine.data.filters[key].defaultValue + ") ";
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
          overlay: {
            type: "none",
            color0: {
              value: "rgba(62, 162, 253, 0.4)"
            },
            color1: {
              value: "rgba(62, 162, 253, 0.4)"
            },
            color2: {
              value: "rgba(2, 122, 233, 0.8)"
            },
            select: "#overlay-radio-none",
            blend: "multiply",
            gradientOrientation: "linear-gradient(to_right"
          }

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
          //URL var creation/parssing
          createURL : function() {
            //this changes the url on input changes
              var myURL = "";
              Object.keys(Engine.data.filters).forEach(function(key) {
                if (Engine.data.filters[key].value != Engine.data.filters[key].defaultValue && Engine.data.filters[key].active === true) {
                  myURL = myURL + key + "=" + Engine.data.filters[key].value.replace(/\s/g, '') + "&" ;
                }
              });
              myURL = "?" + myURL  + "r=" + Engine.data.overlay.select.substring(1); // this has a # so let's kill that because URL Vars do not like #
              window.history.replaceState(null, null, myURL);
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
               console.log("key " +  key + "$(\"[data-filter='"  + key + "'])\" ");
              $("[data-filter='"  + key + "']").val(value);
              Engine.data.filters[key].value = value;
              $("#sepia-a").change();
            });
            //r is shorthand for radio checkbox, if this has been set, then tag action to select the radio box for gradients
            if(window.location.href.indexOf("r=") > -1) {
             var newString =  String(queries.r);
              var myActiveOverlay = 'input[value="#' + newString + '"]';
              $(myActiveOverlay).prop("checked", true).change();
              Engine.colorPicking.updateColorPicker(".color1.text",  ".color1.picker" );
            }
            //no point in tryig to set the second color if it doesn't exist
            if(window.location.href.indexOf("color2=")> -1) {
              Engine.colorPicking.updateColorPicker(".color2.text",  ".color2.picker" );
            } else {
              Engine.colorPicking.updateColorPicker(".color1.text",  ".color.picker" ); //if there isn't a second color, then update the solid color picker
            }
          }
        },
        ui: {
          //The UI functionality
					sliders : function () {
						//on change events for sliders
            $("[data-filter]").change(function() {
              var value = $(this).val();
              var target = "[data-filter='" + $(this).data("filter") + "']";
              $(target).val(value);
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
          Object.keys(Engine.data.filters).forEach(function(key) {
            Engine.data.filters[key].value = Engine.data.filters[key].defaultValue;
            $('input[data-filter="'  + key + '"]').data(filter, Engine.data.filters[key].defaultValue);

          });
            $("#sepia-a").change();
            Engine.ui.killOverlay(); //obliterate the Overlay
          },
					resetButton : function() {
						$("#reset").click(function() {
							Engine.ui.reset(); //trigger reset
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
				 presetSet : function(filterName, newValue) {
					 //use for presets

					 var mySliderNameA = "#" + filterName + "-a",
					     mySliderNameB ="#" +  filterName + "-b";
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
