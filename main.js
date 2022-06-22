var f = require("Storage").open("log","a");
function onInit(){
  pinMode(D29, "input_pullup");
  pinMode(D30, "input_pullup");
  pinMode(D31, "input_pullup");
}

function pullups(){
  pinMode(D29, "input_pullup");
  pinMode(D30, "input_pullup");
  pinMode(D31, "input_pullup");
}

function pulldowns(){
  pinMode(D29, "input_pulldown");
  pinMode(D30, "input_pulldown");
  pinMode(D31, "input_pulldown");
}
// Write data
setInterval(function() {
  var g = require("Storage").open("log","r");
  var length=g.len;
  pullups();
  if(require("Storage").getFree()>28670){ //28672 is target
  f.write(getTime().toFixed(0)+","+analogRead(D29)+","+analogRead(D30)+","+analogRead(D31)+"\n");
  } pulldowns();
}, 60*5*1000); //data logging interval (in milliseconds) set for 5 minutes. 

setInterval(function() {
  var g = require("Storage").open("log","r");
  var length=g.len;
  pullups();
  if((require("Storage").getFree()<28671)&&(require("Storage").getFree()>5000)){
  f.write(getTime().toFixed(0)+","+analogRead(D29)+","+analogRead(D30)+","+analogRead(D31)+"\n");
  } pulldowns();
}, 60*60*1000); //data logging interval (in milliseconds) set for 60 minutes. 

function getData(callback) {
  var f = require("Storage").open("log","r");
  var length=f.len;
  var l = f.readLine();
  while (l!==undefined) {
    callback(l);
    l = f.readLine();
  }
}
