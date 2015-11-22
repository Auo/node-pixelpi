var ws28x = require('rpi-ws281x-native');

function AnimationPlayer () {

}

AnimationPlayer.prototype.init = function init (loopInterval, animations, pixelHeight, pixelWidth, cb) {
  ws28x.init(pixelHeight * pixelWidth)

  this.interval = loopInterval || (1000 / 16)
  this.currentAnimationIndex = 0
  this.currentAnimationFrame = 0
  this.animations = animations

  if (!this.animations || this.animations.length === 0) {
    return cb({message: 'animations null or number of animations is zero'})
  }

  this.intervalHandler = setInterval(_loop, this.interval);

  return cb()
}

AnimationPlayer.prototype.nextAnimation = function nextAnimation () {
  if ((this.currentAnimationIndex + 1) <= (this.animations.length - 1) {
    this.currentAnimationIndex++
  }else {
    this.currentAnimationIndex = 0
  }
}

AnimationPlayer.prototype.previousAnimation = function previousAnimation () {
  if (this.currentAnimationIndex - 1 >= 0) {
    this.currentAnimationIndex--
  }else {
    this.currentAnimationIndex = this.animations.length - 1
  }
}


AnimationPlayer.prototype._drawFrame = function _drawFrame () {
  ws28x.render(this.animations[currentAnimationIndex].frames[currentAnimationFrame]);
}


AnimationPlayer.prototype._nextAnimationFrame = function _nextAnimationFrame () {
  if (this.currentAnimationFrame + 1 <= (this.animations[currentAnimationIndex].frames.length - 1)) {
    this.currentAnimationFrame++
  }else{
    this.currentAnimationFrame = 0
  }
}

AnimationPlayer.prototype._loop = function _loop () {
  this._drawFrame()
  this._nextAnimationFrame() // should always be 0 when there is just a static image
}


//TODO does the redraw have to happen when there is only ONE frame in the animation? It is static anyway.
// Keep track of current animation have been drawn atleast once?
