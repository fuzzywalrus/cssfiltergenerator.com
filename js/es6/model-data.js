let modelData = function () {
  // filter data storage
  class FilterData {
    constructor (value, position, active = true) {
      this.value = value;
      this.position = position;
      this.active = active; //all states start as active

    }
  }
  let blur = new FilterData(0,0);
  let brightness = new FilterData(1,1);
  let contrast = new FilterData(1,2);
  let grayscale = new FilterData(0,3);
  let huerotate = new FilterData(0,4);
  let invert = new FilterData(0,5);
  let opacity = new FilterData(1,6);
  let saturate = new FilterData(1,7);
  let sepia = new FilterData(0,8);
  let filters = {
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
  let data = {
     filters: filters,
    //overlay is special case, no use creating a class
    overlay: {
      color0: "rgba(62, 162, 253, 0.4)",
      color1: "rgba(255, 255, 255, 0.4)",
      color2: "rgba(255, 0, 62, 0.9)",
      select: "#overlay-radio-none",
      blend: "multiply",
      gradientOrientation: "linear-gradient(to right"
    }
  }
  return data;
}
let data = modelData();
