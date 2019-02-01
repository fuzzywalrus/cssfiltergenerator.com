const eventsClick = {
   showhidefilters : () => {
    //toggle the sliders/text box inputs to enable or disable filters
    $("label[data-filter]").click( (event) => {
      console.log(`event ${event.currentTarget}`);
      console.log(event.currentTarget);
      let myLabel = $(event.currentTarget),
          myFilter = `input[data-filter='${$(event.currentTarget).data("filter")}']`;
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
  resetButton: () => {
    $("#reset").click( (event) => {
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
  onOffSwitchPrefix: () => {
    $("#onoffswitch-browserprefix").click( () => {
      $("body").toggleClass("show-prefix");
    });
  },
  flipDemoImage : () => {
    $(".css-tab").click( (e) => {
      eventActions.toggleCSSTab(e);
    });
  },
  shareURL: () => {
    $("#shareURL").click( (event) => {
     let myURL = "http://www.cssfiltergenerator.com/" + modelURLShare.createURL();
     $("#clipboardText").val(myURL);
     $("#shareModal").fadeIn();
    });
    $("#clipboard").click( (event) => {
     var copyText = document.getElementById("clipboardText");
     copyText.select();
     document.execCommand("Copy");
     $(".copied").css({ opacity: 1 });
     setTimeout(  () => {
         $(".copied").css({ opacity: 0 });
     }, 3100);
    });
  },
  saveFilter: () => {
    $("#writeFilter").click( () => {
      controlDataStorage.writeData();
    });
  },
  copyToClipboard : () => {
    $("#clipboard").click( () => {
      var copyText = document.getElementById("clipboardText");
      console.log("copy");
      copyText.select();
      document.execCommand("Copy");
      $(".copied").css({ opacity: 1 });
      setTimeout(  () => {
          $(".copied").css({ opacity: 0 });
      }, 3100);
    });
  },
  closeModal : () => {
    $("#shareModal").click( () => {
      $("#shareModal").fadeOut();
    });
  },
  loadFilter : () => {
    $("#readFilter").click( ()=> {
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
  imageSwap: () => {
    $("a[data-fullsize]").click( (event) => {
        event.preventDefault(); //stop href from using anchor #
        var newUrl = $(event.currentTarget).data("fullsize");
        $("#demoimage").attr("src", newUrl);
        $(".preset img").attr("src", newUrl);
    });
  },
  presets : () => {
    $(".preset").click( (event) => {
      event.preventDefault(); //stop href from using anchor #
      eventsResets.resetData();
      let placed = {};
      let map = new Map();
      placed = $(event.currentTarget).data();
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
  previewImage: () => {
    $("#previewImage").click( () => {
      eventActions.showFullScreenOverlay();
    });
  },
  fullscreenOverlayClose: () => {
    $("#fullscreenOverlayClose").click( () => {
      eventActions.closeFullScreenOverlay();
    });
    $("#bib").click( (event)=> {
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
