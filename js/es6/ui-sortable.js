/*
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

*/
const uiSortable = {
  init : function(){
      // https://github.com/RubaXa/Sortable
      var el = document.getElementById('sortable');
      //sortable.store.set(sortable);
      var sortable = Sortable.create(el, {
        handle: ".updown",
        group: "localStorage-example",
        store: {
          /**
           * Get the order of elements. Called once during initialization.
           * @param   {Sortable}  sortable
           * @returns {Array}
           */
          get: function (sortable) {
            var order = localStorage.getItem(sortable.options.group.name);
            return order ? order.split('|') : [];
          },
          /**
           * Save the order of elements. Called onEnd (when the item is dropped).
           * @param {Sortable}  sortable
           */
          set: function (sortable) {
            var order = sortable.toArray();
            localStorage.setItem(sortable.options.group.name, order.join('|'));
          }
        },
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
          //Engine.data.filters.positioner();
          console.log("onupdate");
          $('input[data-filter][type="number"]').each(function( index, element ) {
            var objName = $(element).data("filter");
            //console.log("index " + index + ", " + element + ", " + objName);
            data.filters[objName].position = index;
          });
          //ui.triggerChange();
          eventsChanges.triggerChange();
        }
      });
      var test =  sortable.option;
   },
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
   }
}
uiSortable.init();
