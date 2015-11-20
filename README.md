# node-pixelpi
Loads .bmp images and outputs them to a led matrix constructed with the ws2812b led-strip, animations and static
Inspired by [Game Frame](http://ledseq.com/) and [Pixel pi] (https://github.com/marian42/pixelpi)

## Requirement
### Software
* Node.js 0.12.6
* https://github.com/jgarff/rpi_ws281x
* All .bmp pictures must be the same size, for now 16 x 16

### Hardware
* Raspberry Pi
* ws2812b led-strip
* Power supply with 5v and 10+ Ampere ( more than 5v, may damage the led-strip )
* [Level shifter](https://www.adafruit.com/products/757) to boost data from raspberry to led-strip
* [Capacitor 1000uF] (http://www.electrokit.com/el-lyt-1000uf-25v-85c-radial-o10x18mm.41799) to protect strip

## Installation
### Software
#### Node.js
The package to control the LED-strip over node.js requires an older version of node, it relies on V8 api

```
wget http://node-arm.herokuapp.com/node_archive_armhf.deb
```
```
sudo dpkg -i node_archive_armhf.deb
```
#### Wifi
[Wifi setup](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md)

### Hardware
TODO


