# Challenge 1 - Building a Nest

### Goal
Create a system that will continuously measure (0.5 Hz) temperature in five locations in the room, compute the instantaneous average temperature and report these values to a central station in calibrated engineering units.

### Required Elements

- [X] Measures temperature at each device
- [ ] Sends data to base 
- [ ] Computes average
- [X] Different program at base vs at wireless device
- [ ] Engineering units displayed

### Qualitative Elements

- [ ] Bonus features

		- [ ] temperature warnings if too hot/cold
- [ ] Evidence of scalability to 1000s of devices
j
		- [ ] use dynamic data structure for list of devices on network
		- [ ] methods to add/drop as mentioned below
- [ ] Robustness to added or dropped devices

		- [ ] function to add device
		- [ ] function to drop device
		- [ ] function to automatically drop device if timeout in communications
- [ ] Demonstrated effort to calibrate sensors

		- [ ] Ice water, boiling water, and room temp test (wrap thermistors in something waterproof)


### TODO
- [ ] figure out a scalable system-level architecture for communication between the xbees and the command receiver (shoulder-taps, flooding the channel with data, etc) 
- [ ] Write the code for processing the incoming data
- [ ] Prepare the presentation docs
- [ ] Make schematic/diagram
