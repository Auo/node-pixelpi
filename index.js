var animationLoader = require('./animation-loader.js')
var animationPlayer = require('./animation-player.js')
var ws28x = require('rpi-ws281x-native')
var gpioHandler = require('./gpio-handler.js')

animationLoader.init(16, 16, function (err, animations) {
  animationPlayer.init(animations, 16, 16, function(err) {
      if(err) throw err

      gpioHandler.init(animationPlayer)
  })
})

process.on('SIGINT', function () {
  gpioHandler.destroy()
  animationPlayer.reset()
  process.nextTick(function () { process.exit(0) })
})
