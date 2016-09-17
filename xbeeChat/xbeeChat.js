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
// Globally-scoped variables
var avg = -500.00;

var measurement = {
  '1': '-500.00',
  '2': '-500.00',
  '3': '-500.00',
  '4': '-500.00'
};

// Parse the incoming transmission from a particular node
function parse_data(dataString) {
  // Format is "2:23.15"
  var arrayOfStrings = dataString.split(':');
  // Check to make sure there isn't weird data jamming the buffer
  if(arrayOfStrings.length == 2) {
    var id = arrayOfStrings[0];
    var temp = arrayOfStrings[1];
    
    // Update the measurement object at that ID
    measurement[id] = temp;
    
  }
}

// Calculate the average temperatures from the system
function calc_avg(allData){
  var total = 0;
  var divisor = 0;
  var allData_length = allData.length;

  // Sum all the readings (1 per node)
  for(i = 1; i < allData_length+1; i++){
    //  Check that reading is valid (i.e. > -273.15 degrees C)
    if(parseFloat(allData[i]) > -273.15) {
      total += parseFloat(allData[i]);
      divisor++;
    }
  }
  // Check to make sure at least 1 valid reading
  if(divisor > 0){
    avg = total/divisor;
  
  } else {
    avg = -500.00;
  }
  
}

// send command and receive data from arduinos
function get_data(){
    // Send the command to all arduinos
	sp.write("send");
}
// Print the instantaneous average
function print_data(avgTemp){
    console.log('The Average is:   ' + avgTemp);
}

// Every 2 seconds, and run the print_data
setInterval(function(){
    get_data();
    print_data(avg);
}, 2000);






