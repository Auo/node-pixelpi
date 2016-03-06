'use strict'

var gpio = require('rpi-gpio')

function GpioHandler() {
}

GpioHandler.prototype.init = function init (animationPlayer) {
  this.powerGPIO = 22
  this.nextGPIO = 7
  this.animationPlayer = animationPlayer
  var self  = this

  gpio.on('change', function(channel, value) {
    if(channel !== self.nextGPIO && channel !== self.powerGPIO) { return }

    if(channel === self.nextGPIO && value) {
      if(self.animationPlayer.isAnimationRunning()) {
         self.animationPlayer.nextAnimation()
      }
    }

    if(channel === self.powerGPIO && !value) {
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
