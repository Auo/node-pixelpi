var test = require('tape')
var animationLoader = require('./../animation-loader.js')

test('Check init', function (t) {
  t.plan(1)

  animationLoader.init('../animations', 16, 16, function (err) {
    t.error(err, 'initialize loader OK!')
  })
})
