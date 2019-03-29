import {Sprite} from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import {backgroundSize, map} from './helpers'
import {app} from './index'
import loader from './loader'

export default class Bg extends Sprite {
  constructor(callback) {
    super()  
    this.tex = new PIXI.Texture.fromImage(loader.resources.bg.url)
    this.texture = this.tex
    this.anchor.set(0.5)
    this.size()
  }
  move(x,y) {
    const n = app.renderer.width * 0.05
    const moverX = map(x, 0, app.renderer.width, (app.renderer.width/2)+n, (app.renderer.width/2)-n)
    const moverY = map(y, 0, app.renderer.height, (app.renderer.width/2)+n, (app.renderer.width/2)-n)
    TweenMax.to(this, 10, {x:moverX, y:moverY})
  }
  size() {
    const bgSize = backgroundSize(app.renderer.width * 1.2 , app.renderer.height * 1.2 , this.tex.baseTexture.width, this.tex.baseTexture.height)
    this.scale.set(bgSize.scale)
    this.x = app.renderer.width / 2
    this.y = app.renderer.height / 2
  }
}

