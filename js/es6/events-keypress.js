const eventsKeypress = {
  keyPress : () => {
    document.onkeydown = (evt) => {
      evt = evt || window.event;
      if (evt.keyCode == 27) {
          eventsKeypress.escapeKeyAction()
      } else if ( evt.altKey && evt.which == 67) {
        if ( $("body").hasClass("fullScreenOverlay") ) {
            eventActions.closeFullScreenOverlay();
        } else {
            eventActions.showFullScreenOverlay();
        }
      } else if ( evt.altKey && evt.which == 88) {
        eventActions.toggleCSSTab();
      }
    }
  },
  escapeKeyAction : () => {
    $("body").removeClass("fullScreenOverlay");
  }
}
eventsKeypress.keyPress();
