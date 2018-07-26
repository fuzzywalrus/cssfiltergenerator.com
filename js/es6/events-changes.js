//
const eventsChanges = {
  // This writes the input value of the numeric input into the data object's corrosponding filter.
  // related functions: setInputPairs
  recordData : function() {
    $("[data-filter]").change(function() {
      let filterNameKey = $(this).data("filter"); //active filter
      data.filters[filterNameKey].value = $(this).val(); //write data
      controlSort.setInputPairs(filterNameKey)
      //console.log(`${filterNameKey}: ${data.filters[filterNameKey].value}`);
    });
  },
  // This writes the on/off value of the checkbox (switch) input into the data object's corrosponding filter.
  onOffSwitch : function() {
    $(".onoffswitch-checkbox").change(function(){
      let filterNameKey = $(this).data("forfilter");
      if ( data.filters[filterNameKey].active === true) {
        data.filters[filterNameKey].active = false;
      } else {
        data.filters[filterNameKey].active = true;
      }
      data.filters[filterNameKey].active = $(this).prop("checked");
      console.log(data.filters[filterNameKey].active)
    });
  },
  //overlay change
  overlayChanges : function() {
    $('[name="overlay"]').change(function() {
        data.overlay.select = $(this).val();
        console.log(data.overlay.select);
    });
    $('.overlay-group input').change(function() {
      data.overlay.color0 = $("#overlay-solid-color-text").val();
      console.log("  data.overlay.color0 " +   data.overlay.color0);
      data.overlay.color1 = $("#overlay-gradient-color1-text").val();
      data.overlay.color2  = $("#overlay-gradient-color2-text").val();
      data.overlay.blend = $("#blending-mode").val();
      data.overlay.orientation = $("#orientation").val();
      //data.overlay.orientation = data.overlay.orientation.replace(/_/g," ");
    });
    //when solid color is changed
    $('.overlay-solid-color').change(function() {
      mustacheTemplate.writeOverlay(data.overlay.blend, data.overlay.color0 );
    });
    //when gradient colors are changed
    $('.overlay-gradient-color').change(function() {
       let myGradient = `${data.overlay.orientation},${data.overlay.color1} 0%, ${data.overlay.color2} 100%)`;
       console.log("myGradient:" + myGradient);
       mustacheTemplate.writeOverlay(data.overlay.blend, myGradient);
    });

    //New overlay functionality
    $('input[type=radio][name=overlay]').change(function() {
      let myChecked = $("input[type=radio][name=overlay]:checked").val();
      console.log("myChecked:" + myChecked);
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
    $("#orientation").change(function() {
      $("#blending-mode").change();
    });
  },
   //when sliders are changed
   //rleated functions mustacheTemplate.writeCSS
   createTemplateString: function()  {
     $("#contain input").change(function() {
       let stringed = controlSort.createString(data.filters);
       mustacheTemplate.writeCSS(stringed.filters, stringed.hoverState);
     });
   },
   triggerChange : function() {
     $("#sepia-a").change();
     $("input[type=radio]").change();
   },
   imageSwap: function() {
     $("#imageURL").change(function() {
       var demoimage = $(this).val();
       $("#demoimage").attr("src", demoimage);
       $(".preset img").attr("src", demoimage);
     });
   },
   overlayDropdowns: function() {
     $("#orientation").change(function(){
       $(".overlay-gradient-color").change();
     });
     $("#blending-mode").change(function(){
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
