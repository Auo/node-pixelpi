'using strict'

var fs = require('fs')
var glob = require('glob')

function AnimationLoader () {

}

AnimationLoader.prototype.init = function init (path, height, width, cb) {
  this.folder = path
  this.h = height
  this.w = width
  // see if there is a folder called animations.
  var self = this
  glob(self.folder + '/**/*.bmp', function (err, files) {
    // flat list
    if (err) return cb(err, null)

    self._buildAnimations(files, function (err, animations) {
      console.log(animations);


      animations.forEach(function (ani) {
        //Do a sort here based on frames.fileName
        ani.frames = ani.frames.sort()
      })

      return cb(null, true)
    })
  })
}

AnimationLoader.prototype._buildAnimations = function _buildAnimations (files, cb) {
  var self = this
  var animations = [];

  files.forEach(function (file) {
    var splitted = file.split('/')
    if(splitted.length === 0) { return cb({message: 'something is wrong'})}


    var name = splitted[splitted.length - 2]
    var frame = splitted[splitted.length - 1]

    splitted.splice(splitted.length - 1, 1)
    var path = splitted.join('/')

    var index = animations.map(function (ani) { return ani.name }).indexOf(name);

    var frameData = {fileName:frame, data: new Uint32Array(self.h * self.w) }

    frameData.data[0] = 0xffffff

    console.log(frameData.data)

    if (index !== -1) {
      animations[index].frames.push(frameData)
    } else {
      animations.push({path: path, name: name, frames:[frameData]})
    }
  })

  return cb(null, animations)
}


module.exports = new AnimationLoader()
