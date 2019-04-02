import {Sprite} from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import {backgroundContain, map} from './helpers'
import {app} from './index'
import loader from './loader'

export default class Text extends Sprite {
  constructor(callback) {
    super()

    this.tex1 = new PIXI.Texture.fromImage(loader.resources.text_1.url)
    this.tex2 = new PIXI.Texture.fromImage(loader.resources.text_2.url)
    this.sprite1 = new PIXI.Sprite(this.tex1)
    this.sprite2 = new PIXI.Sprite(this.tex2)
    this.sprite1.anchor.set(0.5)
    this.sprite2.anchor.set(0.5)

    this.addChild(this.sprite1)
    this.addChild(this.sprite2)
    this.scale.set(0)
    this.anchor.set(0)
    this.size()
  }

  move(x, y, isGyro) {
    let n = 0.07
    let tweenTime = 0.01
    let moverX, moverY
    if (!isGyro) {
      moverX = map(x, 0, app.renderer.width, n, -n)
      moverY = map(y, 0, app.renderer.height, n, -n)
    } else {
      let n = 0.1
      moverX = map(x, -40, 40, n, -n)
      moverY = map(y, -40, 90, n, -n)        
    }
    TweenMax.to(this.sprite1.skew,tweenTime,{x:moverX, y:moverY})
    TweenMax.to(this.sprite2.skew,tweenTime, {x:moverY, x:moverX})
  }

  in() {
    TweenMax.to(this.scale, 7, {x: 1, y:1, delay: 3})
  }

  out() {
    TweenMax.to(this.scale, .3, {x: 0, y:0})
  }

  size() {
    const sizer = backgroundContain(app.renderer.width * 0.8, app.renderer.height * 0.8, this.tex1.baseTexture.width, this.tex1.baseTexture.height)
    this.sprite1.scale.set(sizer.scale)
    this.sprite2.scale.set(sizer.scale)

    this.x = app.renderer.width / 2
    this.y = app.renderer.height / 2
  }
}

