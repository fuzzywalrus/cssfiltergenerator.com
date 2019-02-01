const eventActions = {
  showFullScreenOverlay : () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    $("body").addClass("fullScreenOverlay");
  },
  closeFullScreenOverlay : () => {
    $("body").removeClass("fullScreenOverlay");
  },
  toggleCSSTab : (e) => {
    if (e != undefined) {
      e.preventDefault();
    }
    $(".filter-parent").toggleClass("flip");
    $(e.target).toggleClass("alt-text");
  }
}
