const controlSort = {
  createString:  function(obj) {
    let filters = "",
        hoverState = "";
    //need to create a map so we can use it to iterate over the data obj based on data.filter[key].positions
    let map = new Map();
      Object.entries(data.filters).forEach(([key, value]) => {
        map.set(key, data.filters[key].position);
      });
      let newMap = new Map([...map].sort(([k, v], [k2, v2])=> {
        if (v > v2) {
          return 1;
        }
        if (v < v2) {
          return -1;
        }
        return 0;
    }));
    newMap.forEach( (key, value, map) =>{
      if (data.filters[value].value != defaults[value].defaultValue && data.filters[value].active === true) {
          filters = `${filters} ${defaults[value].cssname}\(${data.filters[value].value}${defaults[value].unit}\) `;
          hoverState = `${hoverState} ${defaults[value].cssname}\(${defaults[value].defaultValue}${defaults[value].unit}\) `;
        }
        console.log(`key: ${key}, value ${value}`)
    });
    console.log(`filters: ${filters}, hoverState: ${hoverState}`);
    return { filters, hoverState }
  },
  syncFilterDataToDOM: function(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      $(`input[data-filter='${key}']`).val(value.value);
    });
    uiSortable.initSort();
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
  mapData : function() {
    let map = new Map();
    Object.entries(data.filters).forEach(([key, value]) => {
      map.set(defaults[key].cssname, data.filters[key].position);
    });
    let newMap = new Map([...map].sort(([k, v], [k2, v2])=> {
      if (v > v2) {
        return 1;
      }
      if (v < v2) {
        return -1;
      }
      return 0;
    }));
    console.log(newMap);
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


let modelData = function () {
  // filter data storage
  class FilterData {
    constructor (value, position, active = true) {
      this.value = value;
      this.position = position;
      this.active = active; //all states start as active

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


const mustacheTemplate = {
  //Mustachejs calls
  writeCSS : function(filters, hoverState) {
    //writes the css filter to the dom
    let source   = $("#filter-template").html();
    let template = Handlebars.compile(source);
    let context = {filters: filters, hoverState: hoverState};
    let html    = template(context);
    $(".filter-css").html(template(context));
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


// init
var el = document.getElementById('sortable');
var mySortable = Sortable.create(el, {
  handle: ".updown",
  group: "localStorage-example",
  onSort: function (/**Event*/evt) {
    console.log("onSort");	// same properties as onEnd
  },
  onChoose: function (/**Event*/evt) {
    console.log("onChoose");  // element index within parent
  },
  onFilter: function (/**Event*/evt) {
    console.log("onFilter"); // HTMLElement receiving the `mousedown|tapstart` event.
  },
  onUpdate: function (/**Event*/evt) {
    console.log("onupdate");
    $('input[data-filter][type="number"]').each(function( index, element ) {
      var objName = $(element).data("filter");
      data.filters[objName].position = index;
    });
    eventsChanges.triggerChange();
  }
});
const uiSortable = {
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
   sortList: function () {
     let arr = [];
     let map = new Map();
       Object.entries(data.filters).forEach(([key, value]) => {
         map.set(key, data.filters[key].position);
       });
       let newMap = new Map([...map].sort(([k, v], [k2, v2])=> {
         if (v > v2) {
           return 1;
         }
         if (v < v2) {
           return -1;
         }
         return 0;
     }));
     newMap.forEach( (key, value, map) =>{
       arr.push(value)
     });
     console.log(arr)
     return(arr);
   },
   initSort: function() {
     mySortable.sort(uiSortable.sortList());

   }
}
//uiSortable.init();


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
      controlSort.syncFilterDataToDOM(data.filters);
    });
  },
  flipDemoImage : function() {
    $(".css-tab").click(function(e) {
      e.preventDefault();
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
  },
  saveFilter: function () {
    $("#writeFilter").click(function() {
      controlDataStorage.writeData();
    });
  },
  copyToClipboard : function() {
    $("#clipboard").click(function() {
      var copyText = document.getElementById("clipboardText");
      console.log("copy");
      copyText.select();
      document.execCommand("Copy");
      $(".copied").css({ opacity: 1 });
      setTimeout(function () {
          $(".copied").css({ opacity: 0 });
      }, 3100);
    });
  },
  closeModal : function() {
    $("#shareModal").click(function() {
      $("#shareModal").fadeOut();
    });
  },
  loadFilter : function() {
    $("#readFilter").click(function() {
      let dataStorage = controlDataStorage.readData();
      if (dataStorage !== "" || dataStorage !== null ) {
        console.log("it worked!");
        data = dataStorage;
        eventsChanges.triggerChange();
      }
      controlSort.syncFilterDataToDOM(data.filters);
    });
  },
  imageSwap: function() {
    $("a[data-fullsize]").click(function() {
        event.preventDefault(); //stop href from using anchor #
        var newUrl = $(this).data("fullsize");
        $("#demoimage").attr("src", newUrl);
        $(".preset img").attr("src", newUrl);
    });
  }

}
eventsClick.showhidefilters();
eventsClick.resetButton();
eventsClick.flipDemoImage();
eventsClick.shareURL();
eventsClick.saveFilter();
eventsClick.copyToClipboard();
eventsClick.closeModal();
eventsClick.loadFilter();
eventsClick.imageSwap();


const eventsResets = {
  killOverlay : function () {
    // remove and hide overlay
    $('.overlay-group').hide();
    $("#filter .overlay-css").html("");
    $("#overlay-css").html("");
    $("#blending-mode").hide();
    $("#orientation").hide();
  },
  resetData : function() {
    // sync data back to default
    Object.keys(data.filters).forEach(function(key) {
      data.filters[key].value = defaults[key].defaultValue;
      data.filters[key].position = defaults[key].position;
      $('input[data-filter="'  + key + 'url"]').data(filter, defaults[key].defaultValue);
    });
    uiSortable.initSort();
  }
}


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
   },
   imageSwap: function() {
     $("#imageURL").change(function() {
       var demoimage = $(this).val();
       $("#demoimage").attr("src", demoimage);
       $(".preset img").attr("src", demoimage);
     });
   }
}
eventsChanges.recordData();
eventsChanges.onOffSwitch();
eventsChanges.overlayChanges();
eventsChanges.createTemplateString();
eventsChanges.imageSwap();


//All things reladed to localestorage read/writes
controlDataStorage = {
  checkData : function () {
    if (localStorage.getItem("data") !== null) {
      $("#readFilter").show();
    }
  },
  writeData : function (){
    localStorage.setItem('data', JSON.stringify(data));
    controlDataStorage.checkData();
  },
  readData : function () {
    let retrievedObject = localStorage.getItem('data');
    retrievedObject =  JSON.parse(retrievedObject);
    return retrievedObject;
  }

}
controlDataStorage.checkData();


const modelURLShare = {
  //URL var creation/parssing uses jsurl.js
  //https://github.com/Sage/jsurl/
  createURL : function() {
    //creates the url
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
      controlSort.syncFilterDataToDOM(data.filters);
      eventsChanges.triggerChange();
    }
  }
}
modelURLShare.getURL();


//init


