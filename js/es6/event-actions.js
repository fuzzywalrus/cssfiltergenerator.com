const eventActions = {
  showFullScreenOverlay : function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("body").addClass("fullScreenOverlay");
  },
  closeFullScreenOverlay : function () {
    $("body").removeClass("fullScreenOverlay");
  },
  toggleCSSTab : function(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    $(".filter-parent").toggleClass("flip");
    $(this).toggleClass("alt-text");
  }
}
