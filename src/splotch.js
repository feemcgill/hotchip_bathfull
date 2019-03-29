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
    this.anchor.set(0.5)
    this.size()
    this.interactive = true
    this
      .on('mousedown', this.advanceVid)
      .on('mouseup', this.retractVid)

    // this.white = new Graphics()
    // this.white.beginFill(0xFFFFFF)
    // this.white.drawRect(0,0, 200, 200)
    // this.addChild(this.white)
  }

  advanceVid() {
   //this.vid.source.currentTime = 0
   this.vid.source.playbackRate = 2
   this.vid.source.play()
  }

  retractVid() {
    //https://codepen.io/blackgghost/pen/qQmjKJ?editors=1010
    //this.vid.source.pause()
  }
  size() {
    const vidSize = backgroundSize(app.renderer.width, app.renderer.height, 1280, 720)
    this.scale.set(vidSize.scale)
    this.x = app.renderer.width / 2
    this.y = app.renderer.height / 2

  }
}



