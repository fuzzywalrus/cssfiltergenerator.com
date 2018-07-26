let modelData = function () {
  // filter data storage
  class FilterData {
    constructor (position, value, active = true) {
      this.active = active; //all states start as active
      this.value = position;
      this.position = position;
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
      color1: "rgba(62, 162, 253, 0.4)",
      color2: "rgba(2, 122, 233, 0.8)",
      select: "#overlay-radio-none",
      blend: "multiply",
      gradientOrientation: "linear-gradient(to right"
    }
  }
  return data;
}
let data = modelData();
