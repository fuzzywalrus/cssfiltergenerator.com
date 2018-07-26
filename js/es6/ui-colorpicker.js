
const colorPicking = {
  updateColorPicker : function(target, destination) {
      //Updates the colorPicker swatch to match the color value in the text field.
      $(destination).spectrum("set", $(target).val());
  },
  updateColor : function(element, color) {
    $(element).val( (color ? color : "") );
    $(element).change();
    console.log("UpdateColor");
  },
  colorPick : function() {
   //New Spectrum code, this initializes all instanes of spectrum
    $('#overlay-solid-color .color').spectrum({
      preferredFormat: "rgb",
      showInput: true,
      showAlpha: true,
      showPalette: false,
      color: 'rgba(112,55,200, 0.4)',
      move: function (color) { colorPicking.updateColor("#overlay-solid-color-text", color); },
      hide: function (color) { colorPicking.updateColor("#overlay-solid-color-text", color); }
    });
    //overlay-linear-gradient color 1 init
    $('#overlay-gradient-color1').spectrum({
      preferredFormat: "rgb",
      showInput: true,
      showAlpha: true,
      showPalette: false,
      color: 'rgba(255, 0, 134, 0.4)',
      move: function (color) { colorPicking.updateColor("#overlay-gradient-color1-text", color); },
      hide: function (color) { colorPicking.updateColor("#overlay-gradient-color1-text", color); }
    });
    //overlay-linear-gradient color 2 init
    $('#overlay-gradient-color2').spectrum({
      preferredFormat: "rgb",
      showInput: true,
      showAlpha: true,
      showPalette: false,
      color: 'rgba(16, 255, 0, 0.4)',
      move: function (color) { colorPicking.updateColor("#overlay-gradient-color2-text", color); },
      hide: function (color) { colorPicking.updateColor("#overlay-gradient-color2-text", color); }
    });
 }
}
colorPicking.colorPick();
