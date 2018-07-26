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
        console.log(`key: ${key}, value ${value}`)
    });
    console.log(`filters: ${filters}, hoverState: ${hoverState}`);
    return { filters, hoverState }

    /*
    Object.entries(obj).forEach(([key, value]) => {
      //  console.log(`Key: ${key}, Value: ${value.value}, Active: ${value.active}, Position: ${value.position}, hoverState: ${hoverState}, filters: ${filters}`);
        if (value.value != defaults[key].defaultValue && value.active === true) {
            filters = `${filters} ${defaults[key].cssname}\(${value.value}${defaults[key].unit}\) `;
            hoverState = `${hoverState} ${defaults[key].cssname}\(${defaults[key].defaultValue}${defaults[key].unit}\) `;
          }
      });
      return { filters, hoverState}
      */
  },
  syncFilterDataToDOM: function(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      $(`input[data-filter='${key}']`).val(value.value);
    });
    uiSortable.initSort();
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
    /*
    Object.entries(data.filters).forEach(([key, value]) => {
      let temp = newMap.get(key);
      if (temp !== undefined) {
        data.filters[key].value = temp;
      }
      console.log("temp:" + temp);
    });
    */
    console.log(newMap);
  }
}
