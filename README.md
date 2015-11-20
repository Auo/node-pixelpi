# node-pixelpi
Loads .bmp images and outputs them to a led matrix constructed with the ws2812b led-strip, animations and static
Inspired by http://ledseq.com/ and https://github.com/marian42/pixelpi

## Requirement
* Node.js 0.12.6
* https://github.com/jgarff/rpi_ws281x
* ws2812b led strip + power supply with 5v and 10+ Ampere ( not more than 5v, may damage the led strip )

## Installation

### Node.js
The package to control the LED-strip over node.js requires an older version of node, it relies on V8 api

```
wget http://node-arm.herokuapp.com/node_archive_armhf.deb
```

```
sudo dpkg -i node_archive_armhf.deb
```

### Hardware installation
TODO

### Wifi
TODO
