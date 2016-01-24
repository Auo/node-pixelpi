var animationLoader = require('./animation-loader.js')
var animationPlayer = require('./animation-player.js')
var ws28x = require('rpi-ws281x-native');

var NUMPIXELS = 4;

//Load the animations, asign the correct size so we can validate images
//TODO: remove sizes in player?
animationLoader.init(16, 16, function (err, animations) {
console.log(animations.length)

  animationPlayer.init(2000, animations, 16, 16, function(err) {
      if(err) throw err

      console.log('animations up and running');
  });
})
