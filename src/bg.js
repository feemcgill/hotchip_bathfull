import {Sprite} from 'pixi.js'
import {TweenMax, TimelineMax} from "gsap/TweenMax"
import {backgroundSize, map} from './helpers'
import {app} from './index'
import loader from './loader'

export default class Bg extends Sprite {
  constructor(callback) {
    super()  
    this.tex = new PIXI.Texture.fromImage(loader.resources.bg.url)
    this.sprite1 = new PIXI.Sprite(this.tex)
    this.tex2 = new PIXI.Texture.fromImage(loader.resources.bg3.url)
    this.sprite2 = new PIXI.Sprite(this.tex)

    
    this.sprite1.anchor.set(0.5)
    this.sprite2.anchor.set(0.5)
    //this.anchor.set(0.5)
    //this.addChild(this.sprite1)
    this.addChild(this.sprite2)

    // this.sprite2.alpha = 1
    this.size()
    //this.fade()
  }
  fade() {
    const delayTime = 1
    const fadeTime = 2
    const element = this.sprite2
    const tl = new TimelineMax({repeat: -1, repeatDelay: delayTime, delay: delayTime});
    tl
      .to(element, fadeTime, {alpha: 1})
      .to(element, delayTime, {alpha: 1})
      .to(element, fadeTime, {alpha: 0});
  }

  move(x,y, isGyro) {
    // const appWidth = app.renderer.width
    // const appHeight = app.renderer.height
    // let n = appWidth * 0.05
    // let moverX, moverY, moverX2, moverY2

    // if (!isGyro) {
    //   moverX = map(x, 0, appWidth, (appWidth/2)+n, (appWidth/2)-n)
    //   moverY = map(y, 0, appHeight, (appHeight/2)+n, (appHeight/2)-n)
    //   moverX2 = map(x, 0, appWidth, (appWidth/2)-n, (appWidth/2)+n)
    //   moverY2 = map(y, 0, appHeight, (appHeight/2)-n, (appHeight/2)+n)
    //   TweenMax.to(this.sprite1, 10, {x:moverX, y:moverY})
    //   TweenMax.to(this.sprite2, 6, {x:moverX2, y:moverY2})
    // } else {
    //   moverX = map(x, -60, 60, (appWidth/2)-n, (appWidth/2)+n)
    //   moverY = map(y, -20, 90, (appHeight/2)-n, (appHeight/2)+n)
    //   TweenMax.to(this.sprite1, 1, {x:moverX, y:moverY})
    //   TweenMax.to(this.sprite2, 0.7, {x:moverX2, y:moverY2})
    // }


  }


  size() {
    const sizer = backgroundSize(app.renderer.width * 1.2 , app.renderer.height * 1.2 , this.tex.baseTexture.width, this.tex.baseTexture.height)
    this.sprite1.scale.set(sizer.scale)
    this.sprite2.scale.set(sizer.scale)

    TweenMax.killTweensOf(this.sprite1);
    TweenMax.killTweensOf(this.sprite2, {x:true, y:true});

    this.sprite1.x = app.renderer.width / 2
    this.sprite1.y = app.renderer.height / 2

    this.sprite2.x = app.renderer.width / 2
    this.sprite2.y = app.renderer.height / 2
  }
}

