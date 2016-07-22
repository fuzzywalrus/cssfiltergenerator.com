function slider(MySliderName){
	var filtername = $(MySliderName).data("filter");
	var MySliderNameA = "#" + filtername + "-a";
	var MySliderNameB ="#" +  filtername + "-b";
	//slider change
	$( MySliderNameA ).change(function() {
		var myval = $(this).val();
		$(MySliderNameB).val(myval);
		console.log("myval: " + myval);
	});
	//number change
	$(MySliderNameB).change(function() {
		var myval = $(this).val();
		$(MySliderNameA).val(myval);
	});
}
$( "input" ).each(function() {
	slider(this);
});


$("#imageURL").change(function() {
	var demoimage = $(this).val();
	$("#demoimage").attr("src", demoimage);
});

$("input").change(function() {
	var filters = "";
	var hoverstate = "";
	$( "input[type=range]" ).each(function() {
		var myValue = $(this).val();
	 	var filtername = $(this).data("filter");
		var myDefaultVal  = $(this).attr('value');

    var concatme =  filtername + "("+ myValue + ") ";
		var concatmehover = filtername + "(" + myDefaultVal + ") ";

		if ($(this).is(':disabled') === false) {
			console.log("concat:" + concatme);
		filters = filters + concatme;
		hoverstate = hoverstate + concatmehover;
		}

  });

	$("#filter").html("filter: " + filters + "; <p> -webkit-filter: " + filters +  ";  <p> -moz-filter: " + filters + ";");
	$("#inlinestyle").html("<style> img#demoimage:hover {"+ "filter: " + hoverstate + " !important; -webkit-filter: " + hoverstate + " !important;  -moz-filter: " + hoverstate + " !important;" +"}</style>")
	$("#demoimage").attr("style", "filter: " + filters + "; -webkit-filter: " + filters + ";  -moz-filter: " + filters + ";");
	$("img[data-fullsize]").attr("style", "filter: " + filters + "; -webkit-filter: " + filters + ";  -moz-filter: " + filters + ";");
});

 $( "#sortable" ).sortable({
	 axis: "y",
	 containment:  "#contain",
	 scroll: false,
 	 stop:  function(event, ui) {
		 $("#sepia-a").change();
	}
 });

$("img[data-fullsize]").click(function() {
		var newurl = $(this).data("fullsize");
		$("#demoimage").attr("src", newurl);
});
$("label").click(function() {
	var mylabel = $(this);
	var myfilter = $(this).data("filter");
	myfilter = "input[data-filter="+ myfilter  + "]";

	if ($(myfilter).is(':disabled') === true) {
		$(myfilter).attr("disabled", false);
		 $("#sepia-a").change();
		 $(mylabel).removeClass("disabled");
	} else {
		$(myfilter).attr("disabled", true);
		$(mylabel).addClass("disabled");
		 $("#sepia-a").change();
	}
});
