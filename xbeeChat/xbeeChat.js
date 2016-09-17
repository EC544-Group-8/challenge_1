var SerialPort = require("serialport");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var portName = process.argv[2],
portConfig = {
	baudRate: 9600,
	parser: SerialPort.parsers.readline("\n")
};
var sp;
sp = new SerialPort.SerialPort(portName, portConfig);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    sp.write(msg + "\n");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

sp.on("open", function () {
  console.log('open');
  sp.on('data', function(data) {
    //console.log('data received: ' + data);
    io.emit("chat message", "An XBee says: " + data);
    // Parsing
    parse_data(data);
    calc_avg(measurement);
  });
});

//==========================================================================
var avg = 0;

var measurement = {
  '1': '0',
  '2': '0',
  '3': '0',
  '4': '0'
};

function parse_data(dataString) {
  var arrayOfStrings = dataString.split(':');
  if(arrayOfStrings.length == 2) {
    var id = arrayOfStrings[0];
    //idArray.push(parseInt(id));
    //console.log(idArray);

    var temp = arrayOfStrings[1];
    measurement[id] = temp;
    //console.log('HERE');
    //for(i = 1; i < 5; i++){
      //console.log(i +'  '+measurement[i])
    //}
  } 
}

function calc_avg(allData){
  var total = 0;
  for(i = 1; i < 5; i++){
    total += parseFloat(allData[i]);
  }
  avg = total/4;
  //console.log('The Average is:   ' + avg);
}

function print_data(avgTemp){
    console.log('The Average is:   ' + avgTemp);
}




setInterval(function(){
    print_data(avg);
},2000);






