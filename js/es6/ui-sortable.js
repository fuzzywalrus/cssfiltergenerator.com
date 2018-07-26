// init
var el = document.getElementById('sortable');
var mySortable = Sortable.create(el, {
  handle: ".updown",
  group: "localStorage-example",
  onSort: function (/**Event*/evt) {
    console.log("onSort");	// same properties as onEnd
  },
  onChoose: function (/**Event*/evt) {
    console.log("onChoose");  // element index within parent
  },
  onFilter: function (/**Event*/evt) {
    console.log("onFilter"); // HTMLElement receiving the `mousedown|tapstart` event.
  },
  onUpdate: function (/**Event*/evt) {
    console.log("onupdate");
    $('input[data-filter][type="number"]').each(function( index, element ) {
      var objName = $(element).data("filter");
      data.filters[objName].position = index;
    });
    eventsChanges.triggerChange();
  }
});
const uiSortable = {
   sortProperties : function (obj) {
     // convert object into array
     var sortable=[];
     for(var key in obj) {
       if ( obj.hasOwnProperty(key) ) {
         sortable.push([key, obj[key]]); // each item is an array in format [key, value]

       }
     }
     // sort items by value
     sortable.sort(function(a, b) {
       return a[1]-b[1]; // compare numbers
     });
     return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
   },
   sortList: function () {
     let arr = [];
     let map = new Map();
       Object.entries(data.filters).forEach(([key, value]) => {
         map.set(key, data.filters[key].position);
       });
       let newMap = new Map([...map].sort(([k, v], [k2, v2])=> {
         if (v > v2) {
           return 1;
         }
         if (v < v2) {
           return -1;
         }
         return 0;
     }));
     newMap.forEach( (key, value, map) =>{
       arr.push(value)
     });
     console.log(arr)
     return(arr);
   },
   initSort: function() {
     mySortable.sort(uiSortable.sortList());

   }
}
//uiSortable.init();
