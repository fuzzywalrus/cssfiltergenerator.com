const controlSort = {
  createString:  function(obj) {
    let filters = "",
        hoverState = "";
    Object.entries(obj).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value: ${value.value}, Active: ${value.active}, Position: ${value.position}, hoverState: ${hoverState}, filters: ${filters}`);
        if (value.value != defaults[key].defaultValue && value.active === true) {
            filters = `${filters} ${defaults[key].cssname}\(${value.value}${defaults[key].unit}\) `;
            hoverState = `${hoverState} ${defaults[key].cssname}\(${defaults[key].defaultValue}${defaults[key].unit}\) `;
          }
      });
      return { filters, hoverState}
  }
}


const modelDefaults = function() {
  class DefaultData {
    constructor (defaultValue, defaultPosition, cssname, unit = "") {
      this.defaultValue = defaultValue;
      this.defaultPosition = defaultPosition;
      this.cssname = cssname;
      this.unit = unit;
    }
  }
  const blur = new DefaultData(0, 0, "blur", "px");
  const brightness = new DefaultData(1, 1, "brightness");
  const contrast = new DefaultData(1, 2, "contrast");
  const grayscale = new DefaultData(0, 3, "grayscale");
  const huerotate = new DefaultData(0, 4, "hue-rotate", "deg");
  const invert = new DefaultData(0, 5, "invert");
  const opacity = new DefaultData(1,6, "opacity");
  const saturate = new DefaultData(1, 7, "saturate");
  const sepia = new DefaultData(0, 8, "sepia");

  const defaults = {
    blur: blur,
    brightness: brightness,
    contrast: contrast,
    grayscale: grayscale,
    huerotate: huerotate,
    invert: invert,
    opacity: opacity,
    saturate: saturate,
    sepia: sepia
  }
  return defaults
}
const defaults = modelDefaults();


const modelURLShare = {
  //URL var creation/parssing uses jsurl.js
  //https://github.com/Sage/jsurl/
  createURL : function() {
    //creates the url on input changes
    var myURL = "?" + JSURL.stringify(data);
    return myURL;
  },
  checkActiveFilters: function (obj) {
    Object.entries(obj).forEach( ([key, value]) => {
      if (obj[key].active === false) {
        $(`input[data-filter='${key}']`).val( Engdata.filters[key].value );
        $(`input[data-forfilter='${key}']`).prop("checked", Engine.data.filters[key].active );
      }
    });
  },
  getURL : function () {
    var myURL = null,
        filters,
        hoverState;
    myURL = JSURL.parse( document.location.search.substring(1) ); // remove ? mark & parse
    if (myURL !== null && myURL !== "" ) {
      data = myURL;
      let stringed = controlSort.createString(data.filters);
      mustacheTemplate.writeCSS(stringed.filters, stringed.hoverState);
      modelURLShare.checkActiveFilters(data.filters);


      if (data.overlay.select !== "#overlay-radio-none") {
        $("#overlay-solid-color-text").val(data.overlay.color0 );
        $("#overlay-gradient-color1-text").val(data.overlay.color1);
        $("#overlay-gradient-color2-text").val(data.overlay.color2);
        $('#overlay-solid-color .color').spectrum({ color: data.overlay.color0 });
        $('#overlay-gradient-color1').spectrum({ color: data.overlay.color1 });
        $('#overlay-gradient-color2').spectrum({ color: data.overlay.color2 });
        $("#blending-mode").val(data.overlay.blend);
        $("#orientation").val(data.overlay.orientation);
        $('[value="'+data.overlay.select+'"]').click();
      }
    eventsChanges.triggerChange();
    }
  }
}
//modelURLShare.getURL();


let modelData = function () {
  // filter data storage
  class FilterData {
    constructor (position, value, active = true) {
      this.active = active; //all states start as active
      this.value = position;
      this.position = position;
    }
  }
  let blur = new FilterData(0,0);
  let brightness = new FilterData(1,1);
  let contrast = new FilterData(1,2);
  let grayscale = new FilterData(0,3);
  let huerotate = new FilterData(0,4);
  let invert = new FilterData(0,5);
  let opacity = new FilterData(1,6);
  let saturate = new FilterData(1,7);
  let sepia = new FilterData(0,8);
  let filters = {
      blur: blur,
      brightness: brightness,
      contrast: contrast,
      grayscale: grayscale,
      huerotate: huerotate,
      invert: invert,
      opacity: opacity,
      saturate: saturate,
      sepia: sepia
  }
  let data = {
     filters: filters,
    //overlay is special case, no use creating a class
    overlay: {
      color0: "rgba(62, 162, 253, 0.4)",
      color1: "rgba(62, 162, 253, 0.4)",
      color2: "rgba(2, 122, 233, 0.8)",
      select: "#overlay-radio-none",
      blend: "multiply",
      gradientOrientation: "linear-gradient(to right"
    }
  }
  return data;
}
let data = modelData();



const colorPicking = {
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
      move: function (color) { colorPicking.updateColor("#overlay-solid-color-text", color); },
      hide: function (color) { colorPicking.updateColor("#overlay-solid-color-text", color); }
    });
    //overlay-linear-gradient color 1 init
    $('#overlay-gradient-color1').spectrum({
      preferredFormat: "rgb",
      showInput: true,
      showAlpha: true,
      showPalette: false,
      color: 'rgba(255, 0, 134, 0.4)',
      move: function (color) { colorPicking.updateColor("#overlay-gradient-color1-text", color); },
      hide: function (color) { colorPicking.updateColor("#overlay-gradient-color1-text", color); }
    });
    //overlay-linear-gradient color 2 init
    $('#overlay-gradient-color2').spectrum({
      preferredFormat: "rgb",
      showInput: true,
      showAlpha: true,
      showPalette: false,
      color: 'rgba(16, 255, 0, 0.4)',
      move: function (color) { colorPicking.updateColor("#overlay-gradient-color2-text", color); },
      hide: function (color) { colorPicking.updateColor("#overlay-gradient-color2-text", color); }
    });
 }
}
colorPicking.colorPick();


/*
sortProperties : function (obj) {
  // convert object into array
  var sortable=[];
  for(var key in obj) {
    if ( obj.hasOwnProperty(key) ) {
      sortable.push([key, obj[key]]); // each item is an array in format [key, value]

    }
  }
  // sort items by value
  sortable.sort(function(a, b) {
    return a[1]-b[1]; // compare numbers
  });
  return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
},

*/


const mustacheTemplate = {
  //Mustachejs calls
  writeCSS : function(filters, hoverState) {
    //writes the css filter to the dom
    let source   = $("#filter-template").html();
    let template = Handlebars.compile(source);
    let context = {filters: filters, hoverState: hoverState};
    let html    = template(context);
    $(".filter-css").html(template(context));
    console.log("writeCSS");
  },
  writeOverlay : function(myBlending, myGradient) {
    //writes the css filter to the dom
    let source   = $("#overlay-template").html();
    let template = Handlebars.compile(source);
    let context = {myBlending: myBlending, myGradient: myGradient};
    let html    = template(context);
    $(".overlay-css").html(template(context));
    console.log("writeOverlay");
  },
  sortFilters : function () {
    let presorted = [];
    let postsorted = [];

    Object.keys(data.filters).forEach(function(key) {
      presorted[key] = data.filters[key].position;
    });
    postsorted = presorted;
    postsorted.sort(function(a, b) {
        return a[1] - b[1];
    });
    console.log("presorted");
    console.log(presorted);
  }
}


const eventsClick = {
   showhidefilters : function (){
    //toggle the sliders/text box inputs to enable or disable filters
    $("label[data-filter]").click(function() {
      console.log("BOOP")
      let myLabel = $(this),
          myFilter = `input[data-filter='${$(this).data("filter")}']`;
          console.log(myFilter);
      if ($(myFilter).is(':disabled') === true) {
        $(myFilter).attr("disabled", false).removeClass("disabled");
        eventsChanges.triggerChange();
      } else {
        $(myFilter).attr("disabled", true).addClass("disabled");
        eventsChanges.triggerChange();
      }
    });
  },
  resetButton: function() {
    $("#reset").click(function() {
      eventsResets.resetData(); //trigger reset
      eventsChanges.triggerChange();
      eventsResets.killOverlay(); //obliterate the Overlay
      window.history.replaceState(null, null,  "/");
      console.log("reset");;
    });
  },
  flipDemoImage : function() {
    $(".css-tab").click(function() {
      event.preventDefault();
      $(".filter-parent").toggleClass("flip");
      $(this).toggleClass("alt-text");
    });
  },
  shareURL: function () {
    $("#shareURL").click(function() {
     let myURL = "http://www.cssfiltergenerator.com/" + modelURLShare.createURL();
     $("#clipboardText").val(myURL);
     $("#shareModal").fadeIn();
    });
    $("#clipboard").click(function() {
     var copyText = document.getElementById("clipboardText");
     copyText.select();
     document.execCommand("Copy");
     $(".copied").css({ opacity: 1 });
     setTimeout(function () {
         $(".copied").css({ opacity: 0 });
     }, 3100);
    });
    $("#closeModal").click(function() {
     $("#shareModal").fadeOut();
    });
  }
}
eventsClick.showhidefilters();
eventsClick.resetButton();
eventsClick.flipDemoImage();
eventsClick.shareURL();




function saveFilter() {
  $("#writeFilter").click(function() {
    //  Engine.dataStorage.writeData();
  });
}

 function shareURL () {
  $("#shareURL").click(function() {
    /* let myURL = "http://www.cssfiltergenerator.com/" + Engine.urlShare.createURL();
    $("#clipboardText").val(myURL);
    $("#shareModal").fadeIn(); */
  });
  $("#clipboard").click(function() {
    var copyText = document.getElementById("clipboardText");
    copyText.select();
    document.execCommand("Copy");
    $(".copied").css({ opacity: 1 });
    setTimeout(function () {
        $(".copied").css({ opacity: 0 });
    }, 3100);
  });
  $("#closeModal").click(function() {
    $("#shareModal").fadeOut();
  });
}

function loadFilter () {
  $("#readFilter").click(function() {
    /*
    var dataStorage = Engine.dataStorage.readData();
    if (dataStorage !== "" || dataStorage !== null ) {
      console.log("it worked!");
      Engine.data = dataStorage;
      Engine.ui.triggerChange();
    }
    */
  });
}


const eventsResets = {
  killOverlay : function () {
    $('.overlay-group').hide();
    $("#filter .overlay-css").html("");
    $("#overlay-css").html("");
    $("#blending-mode").hide();
    $("#orientation").hide();
  },
  resetData : function() {
    Object.keys(data.filters).forEach(function(key) {
      data.filters[key].value = defaults[key].defaultValue;
      $('input[data-filter="'  + key + 'url"]').data(filter, defaults[key].defaultValue);
    });
  }
}



const eventsChanges = {
  // This writes the input value of the numeric input into the data object's corrosponding filter.
  // related functions: setInputPairs
  recordData : function() {
    $("[data-filter]").change(function() {
      let filterNameKey = $(this).data("filter"); //active filter
      data.filters[filterNameKey].value = $(this).val(); //write data
      eventsChanges.setInputPairs(filterNameKey)
      //console.log(`${filterNameKey}: ${data.filters[filterNameKey].value}`);
    });
  },
  triggerChange : function() {
    //Engine.template.sortFilters();
    $("#sepia-a").change();
  },
  //make sure both inputs have the same data
  // related functions: recordData
  setInputPairs : function(filterNameKey) {
    $(`[data-filter="${filterNameKey}"`).each(function() {
      if ($(this).data("filter") !== data.filters[filterNameKey].value  ) {
        $(this).val( data.filters[filterNameKey].value)
      }
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
       console.log(stringed);
       /*
      let filters = "",
          hoverState = "";
        Object.entries(data.filters).forEach(([key, value]) => {
          console.log(`Key: ${key}, Value: ${value.value}, Active: ${value.active}, Position: ${value.position}, hoverState: ${hoverState}, filters: ${filters}`);
          let returnData = controlSort.createString(key, value, filters, hoverState);
          filters =  filters + returnData.newfilters;
          hoverState = hoverState  + returnData.newhoverState;
          console.log(returnData);
          console.log(`hoverState: ${hoverState}, filters: ${filters}`)
          //controlSort.createString(key, filters, hoverState);

          if (value.value != defaults[key].defaultValue && value.active === true) {
              filters = `${filters} ${defaults[key].cssname}\(${value.value}${defaults[key].unit}\) `;
              hoverState = `${hoverState} ${defaults[key].cssname}\(${defaults[key].defaultValue}${defaults[key].unit}\) `;
            }

        });
          */
        mustacheTemplate.writeCSS(stringed.filters, stringed.hoverState);
     });
   },
   triggerChange : function() {
     $("#sepia-a").change();
   }
}
eventsChanges.recordData();
eventsChanges.setInputPairs();
eventsChanges.onOffSwitch();
eventsChanges.overlayChanges();
eventsChanges.createTemplateString();


//init


