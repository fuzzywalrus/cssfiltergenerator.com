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
