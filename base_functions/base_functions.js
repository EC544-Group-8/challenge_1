/*******************************
 * Functions used by base XBee
 * base_functions.js
 *
 * Boston University
 * EC544 Fall 2016 - Group 8
 * Andrew Delollis, Connor McCann, Eric Mooney, Luke Osborne
 *
 * Challenge 1
 */

// load math.js
var math = require('mathjs');
//===================================================
// Global Variables
const NUM_INITIAL_DEVICES = 5;
var devices = []; // an array of devices on network
//===================================================

//===================================================
// Manage devices on network
//===================================================
function add_device(id, devices){
		devices.push(id);
		return devices;
}

function remove_device(id, devices){
		// find device id in array
		var index = devives.indexOf(id);
		if (index > -1){ // if found
				devices.splice(index, 1);
		}
		return devices;
}

//===================================================
// Data Collection
//===================================================
// Average the collected temps
function average_temp(temps) {
		return math.mean(temps);
}

// Get temp from one device
function get_temp(device_id){
		var temp;

		// Ping device
		// TODO	

		// Wait for ready
		// TODO	
		
		// Store response
		// TODO	

		// DEBUGGING
		// Return random temp for testing
		var max = 40;
		var min = 10;
		temp = math.random() * (max - min) + min;
		// END DEBUGGING
		return temp;
}

// Collect temp data from all devices
function collect_data(devices) {
		// Store all temp readings from devices
		var temps = [];

		// Loop through the devices
		for (var i = 0; i < devices.length; i++) {
			temps.push(get_temp(devices[i]));
		}

		// Return averaged temps
		return average_temp(temps);
}

//===================================================
function display_temp(devices){
		var average_temp = collect_data(devices);

		console.log(average_temp);
}

for (var i = 0; i < NUM_INITIAL_DEVICES; i++){
		add_device(i, devices);
}

display_temp(devices);
