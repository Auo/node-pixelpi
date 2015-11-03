'using strict'
var glob = require('glob')
var pixelBitmap = require('pixel-bmp')

function AnimationLoader () {

}

AnimationLoader.prototype.init = function init (height, width, cb) {
  this.folder = __dirname
  this.h = height
  this.w = width
  // see if there is a folder called animations.
  var self = this

  glob(self.folder + '/animations/solid/*.bmp', function (err, files) {
    if (err) return cb(err, null)

    self._buildAnimations(files, function (err, animations) {
      if (err) return cb(err, null)

      animations.forEach(function (ani) {
        // Mutable sort
        ani.frames.sort(function (a, b) {
          return parseInt(a.fileName.split('.')[0], 2) - parseInt(a.fileName.split('.')[0], 2)
        })
      })
 console.log(animations[0].frames[0].data)
 console.log(animations[0].frames[0].data.length)


console.log('first', animations[0].frames[0].data[0]);

console.log('second', animations[0].frames[0].data[1]);

console.log('third', animations[0].frames[0].data[2]);

console.log('forth', animations[0].frames[0].data[3]);

      return cb(null, animations)
    })
  })
}

AnimationLoader.prototype._buildAnimations = function _buildAnimations (files, cb) {
  var self = this
  var animations = []
  var fileIndex = 0
  var length = files.length

  var _loop = function (files) {
    self._createFrameData(files[fileIndex], function (imgData) {
//console.log(imgData);

      var splitted = files[fileIndex].split('/')
      if (splitted.length === 0) { return cb({message: 'something is wrong'}) }

      var name = splitted[splitted.length - 2]
      var frame = splitted[splitted.length - 1]
      splitted.splice(splitted.length - 1, 1)
      var path = splitted.join('/')

      var frameData = { fileName: frame, data: imgData }
      var index = animations.map(function (ani) { return ani.name }).indexOf(name)

      if (index !== -1) {
        animations[index].frames.push(frameData)
      } else {
        animations.push({path: path, name: name, frames: [frameData]})
      }

      fileIndex++
      if (fileIndex < length) {
        _loop(files)
      } else {
        return cb(null, animations)
      }
    })
  }
  _loop(files)
}

AnimationLoader.prototype._createFrameData = function _createFrameData (file, cb) {
  var self = this

  pixelBitmap.parse(file).then(function (images) {
    var uint32 = new Uint32Array(256)
    var parsed = images[0]
    var uintIndex = 0
    for (var i = 0; i < parsed.data.length; i++) {
      uint32[uintIndex] = self._to24bit(self._toHex(parsed.data[i], parsed.data[i++], parsed.data[i++]))
      uintIndex++
      i++ // remove the last because that describes the opacity
    }

    return cb(uint32)
  })
}

AnimationLoader.prototype._toHex = function _toHex (r, g, b) {
  return r.toString(16) + g.toString(16) + b.toString(16)
}

AnimationLoader.prototype._to24bit = function _to24bit (hex) {
  return parseInt(hex, 16)
}

module.exports = new AnimationLoader()
