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

  this._setIntervalHandler()

  return cb()
}

AnimationPlayer.prototype._clearIntervalHandler = function _clearIntervalHandler() {
  if(this.intervalHandler) {
    clearInterval(this.intervalHandler)
     this.intervalHandler = null
    }
}

AnimationPlayer.prototype._setIntervalHandler = function _setIntervalHandler() {
  this.intervalHandler =  setInterval(this._loop.bind(this), this.animations[this.currentAnimationIndex].interval)
}

AnimationPlayer.prototype.nextAnimation = function nextAnimation () {

  this._clearIntervalHandler()
  this.currentAnimationFrame = 0
  if ((this.currentAnimationIndex + 1) <= (this.animations.length - 1)) {
    this.currentAnimationIndex++
  }else {
    this.currentAnimationIndex = 0
  }
  this._setIntervalHandler()
  console.log(this.animations[this.currentAnimationIndex].name)
}

AnimationPlayer.prototype.previousAnimation = function previousAnimation () {
  this._clearIntervalHandler()
  this.currentAnimationFrame = 0
  if (this.currentAnimationIndex - 1 >= 0) {
    this.currentAnimationIndex--
  }else {
    this.currentAnimationIndex = this.animations.length - 1
  }
  this._setIntervalHandler()
}

AnimationPlayer.prototype.startAnimationByName = function startAnimationByName (name) {
    var index = this.animations.map(function (ani) { return ani.name }).indexOf(name)
    if (index === -1) { return }

    console.log('changing to animation with name: ', name)
    this.currentAnimationIndex = index
    this.currentAnimationFrame = 0
    this._setIntervalHandler()
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

AnimationPlayer.prototype.pauseFrameAnimation = function stopFrameAnimation () {
  this._clearIntervalHandler()
  //draw a black frame and then cancel iteration?
  this.reset()
}

AnimationPlayer.prototype.continueFrameAnimation = function continueFrameAnimation () {
  ws281x.init(this.numPixels)
  ws281x.setBrightness(50)
  //this doesn't work, why?
  setTimeout(this._setIntervalHandler.bind(this), 500)
}

AnimationPlayer.prototype.isAnimationRunning = function isAnimationRunning () {
  return !!this.intervalHandler
}

AnimationPlayer.prototype._loop = function _loop () {
  this._nextAnimationFrame() // should always be 0 when there is just a static image
  this._drawFrame()
}

module.exports = new AnimationPlayer()
