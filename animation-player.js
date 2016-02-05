var ws281x = require('rpi-ws281x-native');

function AnimationPlayer () {

}

AnimationPlayer.prototype.init = function init (animations, pixelHeight, pixelWidth, cb) {
  this.numPixels = pixelHeight * pixelWidth
  this.currentAnimationIndex = 0 //starting animaton, should be 0
  this.currentAnimationFrame = 0 //starting animation frame, should be 0
  this.animations = animations

  if (!this.animations || this.animations.length === 0) {
    return cb({message: 'animations null or number of animations is zero'})
  }

  ws281x.init(this.numPixels)
  ws281x.setBrightness(50) //0-255 brightness

  this.intervalHandler = null

  return cb()
}

AnimationPlayer.prototype._setIntervalHandler = function _setIntervalHandler(interval) {
  if(this.intervalHandler) { clearInterval(this.intervalHandler) }
  this.intervalHandler =  setInterval(this._loop.bind(this), interval)
}

AnimationPlayer.prototype.nextAnimation = function nextAnimation () {
  this._setIntervalHandler(this.animations[index].interval)
  if ((this.currentAnimationIndex + 1) <= (this.animations.length - 1)) {
    this.currentAnimationIndex++
  }else {
    this.currentAnimationIndex = 0
  }
}

AnimationPlayer.prototype.previousAnimation = function previousAnimation () {
  this._setIntervalHandler(this.animations[index].interval)
  if (this.currentAnimationIndex - 1 >= 0) {
    this.currentAnimationIndex--
  }else {
    this.currentAnimationIndex = this.animations.length - 1
  }
}

AnimationPlayer.prototype.startAnimationByName = function startAnimationByName (name) {
    var index = this.animations.map(function (ani) { return ani.name }).indexOf(name)
    if (index === -1) { return }

    this._setIntervalHandler(this.animations[index].interval)
    console.log('changing to animation with name: ', name)
    this.currentAnimationIndex = index
    this.currentAnimationFrame = 0

}

AnimationPlayer.prototype._drawFrame = function _drawFrame () {
  ws281x.render(this.animations[this.currentAnimationIndex].frames[this.currentAnimationFrame].data);
}

AnimationPlayer.prototype._nextAnimationFrame = function _nextAnimationFrame () {
  if (this.currentAnimationFrame + 1 <= (this.animations[this.currentAnimationIndex].frames.length - 1)) {
    this.currentAnimationFrame++
  }else{
    this.currentAnimationFrame = 0
  }
}

AnimationPlayer.prototype.reset = function reset () {
  ws281x.reset()
}

AnimationPlayer.prototype._loop = function _loop () {
  this._drawFrame()
  this._nextAnimationFrame() // should always be 0 when there is just a static image
}

//TODO does the redraw have to happen when there is only ONE frame in the animation? It is static anyway.
// Keep track of current animation have been drawn atleast once?

module.exports = new AnimationPlayer()
