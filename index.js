var animationLoader = require('./animation-loader.js')
var animationPlayer = require('./animation-player.js')
var ws28x = require('rpi-ws281x-native')
var gpio = require('rpi-gpio')
var gpioNextChannel = 7
var loaded = false;

animationLoader.init(16, 16, function (err, animations) {
  animationPlayer.init(animations, 16, 16, function(err) {
      if(err) throw err

      loaded = true
      console.log('animations up and running')
  })
})

process.on('SIGINT', function () {
  animationPlayer.reset()
  process.nextTick(function () { process.exit(0); })
})

gpio.on('change', function(channel, value) {
  if(!loaded) { return }

  if(channel == gpioNextChannel && !value) {
    animationPlayer.nextAnimation()
  }
})

gpio.setup(gpioNextChannel, gpio.DIR_IN, gpio.EDGE_RISING)
