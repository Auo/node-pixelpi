var animationLoader = require('./animation-loader.js')
var animationPlayer = require('./animation-player.js')
var ws28x = require('rpi-ws281x-native')

animationLoader.init(16, 16, function (err, animations) {
  animationPlayer.init(animations, 16, 16, function(err) {
      if(err) throw err
      console.log('animations up and running')

      animationPlayer.startAnimationByName('star')
  })
})

process.on('SIGINT', function () {
  animationPlayer.reset()
  process.nextTick(function () { process.exit(0); })
})
