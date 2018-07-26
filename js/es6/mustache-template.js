const mustacheTemplate = {
  //Mustachejs calls
  writeCSS : function(filters, hoverState) {
    //writes the css filter to the dom
    let source   = $("#filter-template").html();
    let template = Handlebars.compile(source);
    let context = {filters: filters, hoverState: hoverState};
    let html    = template(context);
    $(".filter-css").html(template(context));
    console.log("writeCSS");
  },
  writeOverlay : function(myBlending, myGradient) {
    //writes the css filter to the dom
    let source   = $("#overlay-template").html();
    let template = Handlebars.compile(source);
    let context = {myBlending: myBlending, myGradient: myGradient};
    let html    = template(context);
    $(".overlay-css").html(template(context));
    console.log("writeOverlay");
  },
  sortFilters : function () {
    let presorted = [];
    let postsorted = [];

    Object.keys(data.filters).forEach(function(key) {
      presorted[key] = data.filters[key].position;
    });
    postsorted = presorted;
    postsorted.sort(function(a, b) {
        return a[1] - b[1];
    });
    console.log("presorted");
    console.log(presorted);
  }
}
