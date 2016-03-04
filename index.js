var animationLoader = require('./animation-loader.js')
var animationPlayer = require('./animation-player.js')
var ws28x = require('rpi-ws281x-native')
var gpio = require('rpi-gpio')
var nextGPIO = 7
var powerGPIO = 16

animationLoader.init(16, 16, function (err, animations) {
  animationPlayer.init(animations, 16, 16, function(err) {
      if(err) throw err

      startGPIO()
      console.log('animations up and running')
  })
})

process.on('SIGINT', function () {
  animationPlayer.reset()
  process.nextTick(function () { process.exit(0) })
})

function startGPIO () {
  gpio.on('change', function(channel, value) {
    if((channel !== nextGPIO && channel !== powerGPIO) || !value) { return }


    if(channel === nextGPIO) {
      if(animationPlayer.isAnimationRunning()) {
         animationPlayer.nextAnimation()
      }
    }

    if(channel === powerGPIO) {
      if(animationPlayer.isAnimationRunning()) {
        animationPlayer.pauseFrameAnimation()
      } else {
        animationPlayer.continueFrameAnimation()
      }
    }
  })

  gpio.setup(nextGPIO, gpio.DIR_IN, gpio.EDGE_RISING)
  gpio.setup(powerGPIO, gpio.DIR_IN, gpio.EDGE_RISING)
}
