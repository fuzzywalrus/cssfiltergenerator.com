const eventsResets = {
  killOverlay : () => {
    // remove and hide overlay
    $('.overlay-group').hide();
    $("#filter .overlay-css").html("");
    $("#overlay-css").html("");
    $("#blending-mode").hide();
    $("#orientation").hide();
  },
  resetData : () => {
    // sync data back to default
    Object.keys(data.filters).forEach( (key) => {
      data.filters[key].value = defaults[key].defaultValue;
      data.filters[key].position = defaults[key].position;
      $('input[data-filter="'  + key + 'url"]').data(filter, defaults[key].defaultValue);
    });
    uiSortable.initSort();
  }
}
