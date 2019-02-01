//All things reladed to localestorage read/writes
controlDataStorage = {
  checkData : () => {
    if (localStorage.getItem("data") !== null) {
      $("#readFilter").show();
    }
  },
  writeData : () => {
    localStorage.setItem('data', JSON.stringify(data));
    controlDataStorage.checkData();
  },
  readData : () => {
    let retrievedObject = localStorage.getItem('data');
    retrievedObject =  JSON.parse(retrievedObject);
    console.log(retrievedObject);

    return retrievedObject;
  }
}
controlDataStorage.checkData();
