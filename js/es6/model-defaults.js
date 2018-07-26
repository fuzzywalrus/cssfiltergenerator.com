const modelDefaults = function() {
  class DefaultData {
    constructor (defaultValue, defaultPosition, cssname, unit = "") {
      this.defaultValue = defaultValue;
      this.defaultPosition = defaultPosition;
      this.cssname = cssname;
      this.unit = unit;
    }
  }
  const blur = new DefaultData(0, 0, "blur", "px");
  const brightness = new DefaultData(1, 1, "brightness");
  const contrast = new DefaultData(1, 2, "contrast");
  const grayscale = new DefaultData(0, 3, "grayscale");
  const huerotate = new DefaultData(0, 4, "hue-rotate", "deg");
  const invert = new DefaultData(0, 5, "invert");
  const opacity = new DefaultData(1,6, "opacity");
  const saturate = new DefaultData(1, 7, "saturate");
  const sepia = new DefaultData(0, 8, "sepia");

  const defaults = {
    blur: blur,
    brightness: brightness,
    contrast: contrast,
    grayscale: grayscale,
    huerotate: huerotate,
    invert: invert,
    opacity: opacity,
    saturate: saturate,
    sepia: sepia
  }
  return defaults
}
const defaults = modelDefaults();
