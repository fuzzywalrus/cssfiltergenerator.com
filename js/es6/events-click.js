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
