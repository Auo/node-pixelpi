'use strict'
function ClickTimer() {

}

//[{name, timeout}]
ClickTimer.prototype.init = function init(timings) {
 this.timers = []

 var self = this
 timings.forEach(function(timing) {
   self.timers.push({ name: timing.name, lastClick: Date.now(), grace: timing.grace})
 })
}

ClickTimer.prototype.clickAllowed = function clickAllowed(name) {
  var index = this.timers.map(function(timing) { return timing.name }).indexOf(name)

  if(index == -1) { return false }

  if (this.timers[index].lastClick + this.timers[index].grace < Date.now()) {
    this._updateLastClick(index)
    return true
  }

  return false
}

ClickTimer.prototype._updateLastClick = function _updateLastClick(index) {
  this.timers[index].lastClick = Date.now()
}


module.exports = new ClickTimer()
