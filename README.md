# display-segment

Controls a [7-segment Sparkfun Serial Display](https://www.sparkfun.com/products/11442).

```js
var segmentlib = require('display-segment');
var led = segmentlib.use(hardware);

led.brightness(1.0);
led.display(49.99, {
	leadingZero: false,
	places: 2
});

// LED now displays "49.99"!
```

### Wiring

Connect VCC and GND to Tessel. Connect SDA and SCL (the I2C) lines to the port you wish to use.

## API

Load the library with `var segmentlib = require('display-segment')`.

&#x20;<a href="#api-segmentlib-use-port-SegmentLED" name="api-segmentlib-use-port-SegmentLED">#</a> segmentlib<b>.use</b>( port )&rarr; <i>SegmentLED</i>  
Returns a new SegmentLED object.

&#x20;<a href="#api-led-clear-next" name="api-led-clear-next">#</a> led<b>.clear</b>( [next] )  
Clear the segmented LED display.

&#x20;<a href="#api-led-display-number-options-next" name="api-led-display-number-options-next">#</a> led<b>.display</b>( number, [options,] [next] )  
Display a four-digit number. If `leadingZero` in options is set to `false`, no leading zeroes are displayed. If `places` in options is set, up to that many decimal places are included.

&#x20;<a href="#api-led-brightness-value-next" name="api-led-brightness-value-next">#</a> led<b>.brightness</b>( value, [next] )  
Control the brightness. `value` is a float from 0.0 to 1.0.

&#x20;<a href="#api-led-segment-index-mask-next" name="api-led-segment-index-mask-next">#</a> led<b>.segment</b>( index, mask, [next] )  
Bits 0-6 of the `mask` value correspond to the segments counterclockwise from the top of the digit. `index` is a value from `0-3` indicating the position of the digit, starting from the left (0).

&#x20;<a href="#api-led-digit-index-number-next" name="api-led-digit-index-number-next">#</a> led<b>.digit</b>( index, number, [next] )  
Set the digit at `index` to `number` from 0-9.

&#x20;<a href="#api-led-decimal-mask-next" name="api-led-decimal-mask-next">#</a> led<b>.decimal</b>( mask, [next] )  
Bits 0-6 of `mask` control the decimal points.

&#x20;<a href="#api-led-reset-next" name="api-led-reset-next">#</a> led<b>.reset</b>( [next] )  
Resets the display to factory settings.

&#x20;<a href="#api-led-on-ready" name="api-led-on-ready">#</a> led<b>.on</b>( 'ready' )  
The `led` object emits the `ready` event once it's been fully loaded.

## License

MIT licensed.
