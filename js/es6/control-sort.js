const controlSort = {
  createString:  function(obj) {
    let filters = "",
        hoverState = "";
    Object.entries(obj).forEach(([key, value]) => {
      //  console.log(`Key: ${key}, Value: ${value.value}, Active: ${value.active}, Position: ${value.position}, hoverState: ${hoverState}, filters: ${filters}`);
        if (value.value != defaults[key].defaultValue && value.active === true) {
            filters = `${filters} ${defaults[key].cssname}\(${value.value}${defaults[key].unit}\) `;
            hoverState = `${hoverState} ${defaults[key].cssname}\(${defaults[key].defaultValue}${defaults[key].unit}\) `;
          }
      });
      return { filters, hoverState}
  },
  syncFilterDataToDOM: function(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      $(`input[data-filter='${key}']`).val(value.value);
    });
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
    })
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
  }
}
