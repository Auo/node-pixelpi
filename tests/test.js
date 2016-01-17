var test = require('tape')
var animationLoader = require('./../animation-loader.js')

test('Check init', function (t) {
  t.plan(3)
  //
  // animationLoader.init( 16, 16, function (err) {
  //   t.error(err, 'initialize loader OK!')
  // })

//GREEN
t.equal(animationLoader._rgb2Int(0,255,0), 65280);
//BLUE
t.equal(animationLoader._rgb2Int(0,0,255), 255);
//RED
t.equal(animationLoader._rgb2Int(255,0,0), 16711680);
})
