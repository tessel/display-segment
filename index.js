// https://github.com/sparkfun/Serial7SegmentDisplay/wiki/Special-Commands#i2cAddress

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function SegmentLED (address, hardware) {
	if (arguments.length < 2) {
		hardware = address;
		address = SegmentLED.DEFAULT_ADDRESS;
	}

	this.i2c = hardware.I2C(address);
	this.clear(function () {
		this.emit('ready');
	}.bind(this));
}

util.inherits(SegmentLED, EventEmitter);

SegmentLED.DEFAULT_ADDRESS = 0x71;

var digits = [
	1 + 2 + 4+ 8 + 16 + 32,
	2 + 4,
	1 + 2 + 64 + 16 + 8,
	1 + 2 + 4 + 8 + 64,
	2 + 4 + 32 + 64,
	1 + 4 + 8 + 32 + 64,
	1 + 4 + 8 + 16 + 32 + 64,
	1 + 2 + 4,
	1 + 2 + 4 + 8 + 16 + 32 + 64,
	1 + 2 + 4 + 8 + 32 + 64,
];

SegmentLED.prototype.reset = function (next) {
	// Factory reset
	this.i2c.send(new Buffer([0x81]), next)
}

SegmentLED.prototype.clear = function (next) {
	// Clear display
	this.i2c.send(new Buffer([0x76]), next)
}

SegmentLED.prototype.segment = function (index, mask, next) {
	// number 
	index = Number(index);
	if (!(index >= 0) || !(index < 4)) {
		throw new Error('Please specify a decimal index 0-3.');
	}

	this.i2c.send(new Buffer([0x7B + index, mask]), next);
}

SegmentLED.prototype.digit = function (index, value, next) {
	this.segment(index, value != null ? digits[value] : 0, next);
}

SegmentLED.prototype.brightness = function (level, next) {
	this.i2c.send(new Buffer([0x7A, Math.floor(level * 255)]), next);
};

SegmentLED.prototype.decimal = function (value, next) {
	this.i2c.send(new Buffer([0x77, value]), next);
}

SegmentLED.prototype.display = function (number, opts, next) {
	if (typeof opts == 'function' ) {
		next = opts;
		opts = {};
	}
	opts = opts || {};

	if (typeof opts.places == 'number') {
		this.decimal(1 << (3 - opts.places));
		number *= Math.pow(10, opts.places);
	}

	number = Math.floor(number);
	this.digit(3, number % 10);
	number = Math.floor(number / 10);
	if (opts.leadingZero != false || number > 0) this.digit(2, number % 10); else this.digit(2, null);
	number = Math.floor(number / 10);
	if (opts.leadingZero != false || number > 0) this.digit(1, number % 10); else this.digit(1, null);
	number = Math.floor(number / 10);
	if (opts.leadingZero != false || number > 0) this.digit(0, number % 10, next); else this.digit(0, null);
}

exports.use = function (hardware) {
	return new SegmentLED(hardware);
}
