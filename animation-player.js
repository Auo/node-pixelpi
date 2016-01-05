var ws28x = require('rpi-ws281x-native');

function AnimationPlayer () {

}

AnimationPlayer.prototype.init = function init (loopInterval, animations, pixelHeight, pixelWidth, cb) {
  this.numPixels = pixelHeight * pixelWidth
  this.interval = loopInterval || (1000 / 16)
  this.currentAnimationIndex = 0 //starting animaton, should be 0
  this.currentAnimationFrame = 0 //starting animation frame, should be 0
  this.animations = animations

  if (!this.animations || this.animations.length === 0) {
    return cb({message: 'animations null or number of animations is zero'})
  }

  ws28x.init(this.numPixels)
  ws28x.setBrightness(20) //0-255 brightness

  this.intervalHandler = setInterval(this._loop.bind(this), this.interval);

  return cb()
}

AnimationPlayer.prototype.nextAnimation = function nextAnimation () {
  if ((this.currentAnimationIndex + 1) <= (this.animations.length - 1)) {
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
console.log(this.animations[this.currentAnimationIndex].name)

  var pixeldata = new Uint32Array(this.numPixels)

  for (var i = 0; i < this.numPixels; i++) {
    pixeldata[i] = this.animations[this.currentAnimationIndex].frames[this.currentAnimationFrame].data[i]
  }
  ws28x.render(pixeldata)
}

AnimationPlayer.prototype._nextAnimationFrame = function _nextAnimationFrame () {
  if (this.currentAnimationFrame + 1 <= (this.animations[this.currentAnimationIndex].frames.length - 1)) {
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

module.exports = new AnimationPlayer()
