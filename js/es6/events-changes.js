//
const eventsChanges = {
  // This writes the input value of the numeric input into the data object's corrosponding filter.
  // related functions: setInputPairs
  recordData : () => {
    $("[data-filter]").change( (event)=> {
      let filterNameKey = $(event.currentTarget).data("filter"); //active filter
      data.filters[filterNameKey].value = $(event.currentTarget).val(); //write data
      controlSort.setInputPairs(filterNameKey)
      //console.log(`${filterNameKey}: ${data.filters[filterNameKey].value}`);
    });
  },
  // This writes the on/off value of the checkbox (switch) input into the data object's corrosponding filter.
  onOffSwitch : () => {
    $(".onoffswitch-checkbox").change( (event) => {
      let filterNameKey = $(event.currentTarget).data("forfilter");
      if ( filterNameKey != undefined) {
        if ( data.filters[filterNameKey].active === true) {
          data.filters[filterNameKey].active = false;
        } else {
          data.filters[filterNameKey].active = true;
        }
        data.filters[filterNameKey].active = $(event.currentTarget).prop("checked");
        //console.log(data.filters[filterNameKey].active)
      }
    });
  },
  //overlay change
  overlayChanges : () => {
    $('[name="overlay"]').change( (event) => {
        data.overlay.select = $(event.currentTarget).val();
      //  console.log(data.overlay.select);
    });
    $('.overlay-group input').change( () => {
      data.overlay.color0 = $("#overlay-solid-color-text").val();
    //  console.log("  data.overlay.color0 " +   data.overlay.color0);
      data.overlay.color1 = $("#overlay-gradient-color1-text").val();
      data.overlay.color2  = $("#overlay-gradient-color2-text").val();
      data.overlay.blend = $("#blending-mode").val();
      data.overlay.gradientOrientation = $("#orientation").val();
    });;
    $('#orientation').on('change', () => {
      console.log("orientation Changed");
      data.overlay.gradientOrientation = $("#orientation").val();
    })
    //when solid color is changed
    $('.overlay-solid-color').change( () => {
      mustacheTemplate.writeOverlay(data.overlay.blend, data.overlay.color0 );
    });
    //when gradient colors are changed
    $('.overlay-gradient-color').change( () => {
       let myGradient = `${data.overlay.gradientOrientation},${data.overlay.color1} 0%, ${data.overlay.color2} 100%)`;
       //console.log("myGradient:" + myGradient);
       mustacheTemplate.writeOverlay(data.overlay.blend, myGradient);
    });

    //New overlay functionality
    $('input[type=radio][name=overlay]').change( () => {
      let myChecked = $("input[type=radio][name=overlay]:checked").val();
      //console.log("myChecked:" + myChecked);
      if ( myChecked == "#overlay-radio-none") {
        eventsResets.killOverlay();
      } else if ( myChecked == "#overlay-solid") {
        $('.overlay-group').hide();
        $(myChecked).css('display', 'inline-block');
        $("#blending-mode").css('display', 'block');
        $("#orientation").hide();
        $(".overlay-group input:visible").change();
      } else {
        $('.overlay-group').hide();
        $(myChecked).css('display', 'inline-block');
        $("#blending-mode").css('display', 'block');
        $("#orientation").css('display', 'block');
        $(".overlay-group input:visible").change();
      }
    });
    $("#orientation").change( () => {
      $("#blending-mode").change();
    });
  },
   //when sliders are changed
   //rleated functions mustacheTemplate.writeCSS
   createTemplateString: () =>  {
     $("#contain input").change( (event) => {
       let stringed = controlSort.createString(data.filters);
       mustacheTemplate.writeCSS(stringed.filters, stringed.hoverState);
     });
   },
   triggerChange : () => {
     $("#sepia-a").change();
     $("input[type=radio]").change();
   },
   imageSwap: () => {
     $("#imageURL").change( (event) => {
       var demoimage = $(event.currentTarget).val();
       if (controlSort.ValidURL(demoimage) == true) {
         $("#demoimage").attr("src", demoimage);
         $(".preset img").attr("src", demoimage);
         $("body").removeClass("urlERR");
       } else {
         $("body").addClass("urlERR");
       }

     });
   },
   overlayDropdowns: () => {
     $("#orientation").change( (event) => {
       $(".overlay-gradient-color").change();
     });
     $("#blending-mode").change(  (event) => {
       $(".overlay-gradient-color").change();
     });
   }
}
eventsChanges.recordData();
eventsChanges.onOffSwitch();
eventsChanges.overlayChanges();
eventsChanges.createTemplateString();
eventsChanges.imageSwap();
eventsChanges.overlayDropdowns();
