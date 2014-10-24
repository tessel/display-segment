var tessel = require('tessel');
var segmentlib = require('./segment');
var climatelib = require('climate-si7020');

var led = segmentlib.use(tessel.port['GPIO']);
var climate = climatelib.use(tessel.port['A']);

led.brightness(1.0);

var i = 0;
;(function loop () {
	climate.readTemperature('f', function (err, temp) {
		console.log('Read:', temp);
		led.display(temp, {
			leadingZero: false,
			places: 2
		});
		setImmediate(loop);
	});
})();
