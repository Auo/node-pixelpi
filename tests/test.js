var test = require('tape')
var animationLoader = require('./../animation-loader.js')

test('Check init', function (t) {
  t.plan(1)

  animationLoader.init( 16, 16, function (err) {
    t.error(err, 'initialize loader OK!')
  })

 // t.equal(animationLoader._to24bit(animationLoader._toHex(255, 255, 255)), 0xffffff)


// console.log(parseInt('ffffff',16));
})
