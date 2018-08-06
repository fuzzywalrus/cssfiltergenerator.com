//All things reladed to localestorage read/writes
controlDataStorage = {
  checkData : function () {
    if (localStorage.getItem("data") !== null) {
      $("#readFilter").show();
    }
  },
  writeData : function (){
    localStorage.setItem('data', JSON.stringify(data));
    controlDataStorage.checkData();
  },
  readData : function () {
    let retrievedObject = localStorage.getItem('data');
    retrievedObject =  JSON.parse(retrievedObject);
    console.log(retrievedObject);

    return retrievedObject;
  }
}
controlDataStorage.checkData();
