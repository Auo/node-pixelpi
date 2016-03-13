'use strict'

var gpio = require('rpi-gpio')
var timer = require('./click-timer.js')

function GpioHandler() {
}

GpioHandler.prototype.init = function init (animationPlayer) {
  this.powerGPIO = 23
  this.nextGPIO = 26
  this.animationPlayer = animationPlayer
  var self  = this


timer.init([ { name: this.powerGPIO, grace: 1000  }, { name: this.nextGPIO, grace: 1000 } ])

  gpio.on('change', function(channel, value) {
    if(channel !== self.nextGPIO && channel !== self.powerGPIO) { return }

    if(!timer.clickAllowed(channel)) { return }

    if(channel === self.nextGPIO && value) {
      console.log('next')
      if(self.animationPlayer.isAnimationRunning()) {
         self.animationPlayer.nextAnimation()
      }
    }

    if(channel === self.powerGPIO && !value) {
      console.log('power')
      if(self.animationPlayer.isAnimationRunning()) {
        self.animationPlayer.pauseFrameAnimation()
      } else {
        self.animationPlayer.continueFrameAnimation()
      }
    }
  })

  gpio.setup(self.nextGPIO, gpio.DIR_IN, gpio.EDGE_RISING)
  gpio.setup(self.powerGPIO, gpio.DIR_IN, gpio.EDGE_RISING)
}

GpioHandler.prototype.destroy = function destroy (cb) {
  gpio.destroy(function() {
    cb()
  })
}

module.exports = new GpioHandler()
