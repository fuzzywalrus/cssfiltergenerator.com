const eventsClick = {
   showhidefilters : function (){
    //toggle the sliders/text box inputs to enable or disable filters
    $("label[data-filter]").click(function() {
    //  console.log("BOOP")
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
      if ($(".filter-parent").hasClass("flip") == false ) {
        eventsResets.resetData(); //trigger reset
        eventsChanges.triggerChange();
        eventsResets.killOverlay(); //obliterate the Overlay
        window.history.replaceState(null, null,  "/");
        //console.log("reset");;
        controlSort.syncFilterDataToDOM(data.filters);
      }
    });
  },
  onOffSwitchPrefix: function () {
    $("#onoffswitch-browserprefix").click( function() {
      $("body").toggleClass("show-prefix");
    });
  },
  flipDemoImage : function() {
    $(".css-tab").click(function(e) {
      eventActions.toggleCSSTab(e);
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
        //console.log("it worked!");
        data = dataStorage;
        eventsChanges.triggerChange();
      }
      controlSort.syncFilterDataToDOM(data.filters);
      mySortable.sort(uiSortable.sortList());
    });
  },
  imageSwap: function() {
    $("a[data-fullsize]").click(function(event) {
        event.preventDefault(); //stop href from using anchor #
        var newUrl = $(this).data("fullsize");
        $("#demoimage").attr("src", newUrl);
        $(".preset img").attr("src", newUrl);
    });
  },
  presets : function() {
    $(".preset").click(function(event) {
      event.preventDefault(); //stop href from using anchor #
      eventsResets.resetData();
      let placed = {};
      let map = new Map();
      placed = $(this).data();
      //iterate over object to make a map to pass to presetSet
      Object.entries(placed).forEach(([key, value]) => {
        if (key.includes("filter") == true ) {
          let str = key.replace("filter", "");
          map.set(str, value);
        }
      });
      console.log(map)
      uiGradient.presetSet(map);
      uiGradient.gradientCheck(this);
      controlSort.syncFilterDataToDOM(data.filters);
      eventsChanges.triggerChange();
    });
  },
  previewImage: function () {
    $("#previewImage").click(function(){
      eventActions.showFullScreenOverlay();
    });
  },
  fullscreenOverlayClose: function() {
    $("#fullscreenOverlayClose").click(function(){
      eventActions.closeFullScreenOverlay();
    });
    $("#bib").click(function(){
      eventActions.closeFullScreenOverlay();
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
eventsClick.presets();
eventsClick.previewImage();
eventsClick.onOffSwitchPrefix();
eventsClick.fullscreenOverlayClose();
