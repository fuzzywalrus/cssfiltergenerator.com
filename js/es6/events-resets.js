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
