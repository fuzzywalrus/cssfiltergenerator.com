//spectrum.js
const uiGradient = {
  presetSet : (map) => {
    //use for presets
    i = 1;

    // take the order of the map and place the data back into data object.
    map.forEach( (value, key, map) =>{
      console.log(`key: ${key} , value: ${value}, position: ${i}` )
        i = i + 1;
        data.filters[key].value = value;
        data.filters[key].position = i;
    });
    // the rest of the positions are undefined, so need to place them
    Object.entries(data.filters).forEach(([key, value]) => {
      if ( data.filters[key].position == undefined) {
        i = i + 1;
        data.filters[key].position = i;
      }
    });
    mySortable.sort(uiSortable.sortList()); // change the positions of list
    $("input[type=radio]").change();
  },
  gradientCheck : (obj) => {
    //used for presets only
    data.overlay.color1 = $(obj).data("color1");
    data.overlay.color2 = $(obj).data("color2");
    data.overlay.select = $(obj).data("gradient");
    data.overlay.gradientOrientation = $(obj).data("orientation");
    data.overlay.blend = $(obj).data("blending-mode");
    $("input[name=overlay]").filter(`[value="${data.overlay.select}"]`).prop("checked", true);
    $(".overlay-group input.color1").val(data.overlay.color1);
    $(".overlay-group input.color2").val(data.overlay.color2);
    $("#blending-mode").val( data.overlay.blend);
    $("#orientation").val(data.overlay.gradientOrientation);
    colorPicking.updateColorPicker(".overlay-group input.color1.text", ".overlay-group input.color1.picker");
    colorPicking.updateColorPicker(".overlay-group input.color2.text", ".overlay-group input.color2.picker");
    console.log("gradientCheck");
  }
}
