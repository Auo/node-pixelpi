'using strict'
var glob = require('glob')
var pixelBitmap = require('pixel-bmp')

function AnimationLoader () {

}

AnimationLoader.prototype.init = function init (height, width, cb) {
  this.folder = __dirname
  this.h = height
  this.w = width
  this.numPixels = height * width
  // see if there is a folder called animations.
  var self = this

  glob(self.folder + '/animations/question/*.bmp', function (err, files) {
    if (err) return cb(err, null)

    self._buildAnimations(files, function (err, animations) {
      if (err) return cb(err, null)

      animations.forEach(function (ani) {
        // Mutable sort
        ani.frames.sort(function (a, b) {
          return parseInt(a.fileName.split('.')[0], 2) - parseInt(a.fileName.split('.')[0], 2)
        })
      })

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
    var uint32 = new Uint32Array(self.numPixels)
    var parsed = images[0]
    var uintIndex = 0

    for (var i = 0; i <= parsed.data.length; i += 4) {
      uint32[uintIndex] = self._rgb2Int(parsed.data[i], parsed.data[i + 1], parsed.data[i + 2])
      uintIndex++
    }

    return cb(uint32)
  })
}

AnimationLoader.prototype._rgb2Int = function _rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}

module.exports = new AnimationLoader()
