var test = require('tape')
var animationLoader = require('./../animation-loader.js')

test('Check init', function (t) {
  t.plan(1)

  animationLoader.init('../animations', 16, 16, function (err) {
    t.error(err, 'initialize loader OK!')
  })




  var a = new UintArray(1)
  var b = new Uint8Array(1)

  a[0] = 0xffffff
  b[0] = 0xffffff




  console.log(a, b);


})
