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
  }
}
