'use strict'
var koa = require('koa')
var app = koa()
var serve = require('koa-static')
var router = require('koa-router')()

function Server() {

}

Server.prototype.init = function init (animationPlayer) {
  this.animationPlayer = animationPlayer

  var self = this
  app.use(serve('./app'))

  router.post('/togglePower', function * (){
    if(self.animationPlayer.isAnimationRunning()) {
      self.animationPlayer.pauseFrameAnimation()
    } else {
      self.animationPlayer.continueFrameAnimation()
    }

    this.body = 'done'
  })

  router.post('/next', function * () {
    if(self.animationPlayer.isAnimationRunning()) {
       self.animationPlayer.nextAnimation()
    }

    this.body = 'done'
  })

  router.post('/prev', function * () {
    if(self.animationPlayer.isAnimationRunning()) {
       self.animationPlayer.previousAnimation()
    }

    this.body = 'done'
  })

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(3000)
}

module.exports = new Server()
