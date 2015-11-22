var animationLoader = require('./animation-loader.js')
var ws28x = require('rpi-ws281x-native');

var NUMPIXELS = 4;

animationLoader.init(16, 16, function (err, animations) {
  var aniSolid = animations[0].frames[0].data
  ws28x.init(NUMPIXELS)

  ws28x.on('render', function() {
    console.log(arguments);
  })

  var pixeldata = new Uint32Array(NUMPIXELS)

  for (var i = 0; i < NUMPIXELS; i++) {
    pixeldata[i] = aniSolid[i]
  }

  ws28x.render(pixeldata)

//ws28x.reset()

})
