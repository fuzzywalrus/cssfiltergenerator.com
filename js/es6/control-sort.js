const controlSort = {
  createString:  function(obj) {
    let filters = "",
        hoverState = "";
    //need to create a map so we can use it to iterate over the data obj based on data.filter[key].positions
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
      if (data.filters[value].value != defaults[value].defaultValue && data.filters[value].active === true) {
          filters = `${filters} ${defaults[value].cssname}\(${data.filters[value].value}${defaults[value].unit}\) `;
          hoverState = `${hoverState} ${defaults[value].cssname}\(${defaults[value].defaultValue}${defaults[value].unit}\) `;
        }
        //console.log(`key: ${key}, value ${value}`)
    });
    console.log(`filters: ${filters}, hoverState: ${hoverState}`);
    return { filters, hoverState }
  },
  syncFilterDataToDOM: function(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      $(`input[data-filter='${key}']`).val(value.value);
    });
    ///uiSortable.initSort();
  },
  //make sure both inputs have the same data
  // related functions: recordData
  setInputPairs : function(filterNameKey) {
    $(`[data-filter="${filterNameKey}"`).each(function() {
      if ($(this).data("filter") !== data.filters[filterNameKey].value  ) {
        $(this).val( data.filters[filterNameKey].value)
      }
    });
  },
  mapData : function() {
    let map = new Map();
    Object.entries(data.filters).forEach(([key, value]) => {
      map.set(defaults[key].cssname, data.filters[key].position);
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
    console.log(newMap);
  },
   ValidURL: function(str) {
     //https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url heavy REGEX ahead
     regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
     if (regexp.test(str))
     {
       return true;
     }
     else
     {
       return false;
     }
  }
}
