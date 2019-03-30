import { Graphics, Sprite, Container} from 'pixi.js'

import {TweenMax} from "gsap/TweenMax"
import {backgroundSize, map, backgroundContain} from './helpers'
import {app} from './index'
import loader from './loader'

export default class Splotch extends Sprite {
  constructor(callback) {
    super()
    this.vidTex = new PIXI.Texture.fromVideo(loader.resources.splotch.url);
    this.texture = this.vidTex
    this.vid = this.texture.baseTexture
    this.vid.source.loop = false
    this.vid.autoPlay = false
    this.vid.source.autoplay = false
    this.vid.source.muted = true
    this.anchor.set(0.5)
    this.size()

  }

  init(){
    this.vid.source.play()
    console.log('splotch init')
  }
  advance(callback) {
   this.vid.source.currentTime = 0
   this.vid.source.playbackRate = 2
   this.vid.source.play()
   this.vid.source.onended = function() {
     callback()
   }
  }

  retract() {
    //https://codepen.io/blackgghost/pen/qQmjKJ?editors=1010
    this.vid.source.pause()
  }

  out() {
    TweenMax.to(this,.3,{alpha:0})
  }

  size() {
    const vidSize = backgroundSize(app.renderer.width, app.renderer.height, 1280, 720)
    this.scale.set(vidSize.scale)
    this.x = app.renderer.width / 2
    this.y = app.renderer.height / 2

  }
}



