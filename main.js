var f = require("Storage").open("log","a");
function onInit(){
  pinMode(D29, "input_pullup");
  pinMode(D30, "input_pullup");
  pinMode(D31, "input_pullup");
}
// Write data
setInterval(function() {
  f.write(getTime().toFixed(0)+","+analogRead(D29)+","+analogRead(D30)+","+analogRead(D31)+"\n");
}, 5*1000);

function getData(callback) {
  var f = require("Storage").open("log","r");
  var l = f.readLine();
  while (l!==undefined) {
    callback(l);
    l = f.readLine();
  }
}
