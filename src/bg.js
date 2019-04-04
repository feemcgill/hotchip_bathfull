import {Sprite} from 'pixi.js'
import {TweenMax, TimelineMax} from "gsap/TweenMax"
import {backgroundSize, map} from './helpers'
import {app, videoTex} from './index'
import loader from './loader'

export default class Bg extends Sprite {
  constructor(callback) {
    super()
    this.state = {
      transitioning: false,
      webGl: true
    }
    this.tex = new PIXI.Texture.fromImage(loader.resources.bg.url)
    this.sprite1 = new PIXI.Sprite(this.tex)
    this.tex2 = new PIXI.Texture.fromImage(loader.resources.bg2.url)
    this.sprite2 = new PIXI.Sprite(this.tex2)

    this.sprite1.anchor.set(0.5)
    this.sprite2.anchor.set(0.5)

    this.anchor.set(0.5)
    this.addChild(this.sprite1)
    this.addChild(this.sprite2)

    this.sprite2.alpha = 0

    if(app.renderer instanceof PIXI.CanvasRenderer) { 
      this.fade()
      this.state.webGl = false
    } else {
      this.vidTex = videoTex
      this.vidSprite = new PIXI.Sprite(this.vidTex)
  
      this.vid = this.vidSprite.texture.baseTexture
      // this.vid.source.loop = false
      // this.vid.autoPlay = false
      // this.vid.source.autoplay = false
      // this.vid.source.muted = true

      this.vidSprite.anchor.set(0.5)
    }
    this.size()
  }
  fade() {
    const delayTime = 10
    const fadeTime = 20
    const element = this.sprite2
    const tl = new TimelineMax({repeat: -1, repeatDelay: delayTime, delay: delayTime});
    tl
      .to(element, fadeTime, {alpha: 1})
      .to(element, delayTime, {alpha: 1})
      .to(element, fadeTime, {alpha: 0});
  }

  init() {
    if (this.state.webGl) {
      this.addChild(this.vidSprite)
      this.sprite2.mask = this.vidSprite
      this.vid.source.playbackRate = 2
      this.vid.source.play()
      this.vid.source.onended = () => {
        setTimeout(() => {
          this.state.transitioning = true
          TweenMax.to(this.sprite1, 3, {x:app.renderer.width / 2, y:app.renderer.height / 2})
          TweenMax.to(this.sprite2, 3, {x:app.renderer.width / 2, y:app.renderer.height / 2})
          TweenMax.to(this.sprite2,0.5,{alpha:0, delay: 3, onComplete:()=> {
            this.vid.source.currentTime = 0
            this.vid.source.play()
            this.sprite2.texture = this.sprite2.texture == this.tex ? this.tex2 : this.tex
            TweenMax.to(this.sprite2, 0.5, {alpha:1, onComplete:() => {
              this.state.transitioning = false
            }})
          }})
          this.sprite1.texture = this.sprite1.texture == this.tex ? this.tex2 : this.tex        
        }, 10000);
  
      }        
    }
    TweenMax.to(this.sprite2,0.5,{alpha:1})
  }

  move(x,y, isGyro) {
    const appWidth = app.renderer.width
    const appHeight = app.renderer.height
    let n = appWidth * 0.05
    let moverX, moverY, moverX2, moverY2

    if (!this.state.transitioning) {
      if (!isGyro) {
        moverX = map(x, 0, appWidth, (appWidth/2)+n, (appWidth/2)-n)
        moverY = map(y, 0, appHeight, (appHeight/2)+n, (appHeight/2)-n)
        moverX2 = map(x, 0, appWidth, (appWidth/2)-n, (appWidth/2)+n)
        moverY2 = map(y, 0, appHeight, (appHeight/2)-n, (appHeight/2)+n)
        TweenMax.to(this.sprite1, 10, {x:moverX, y:moverY})
        TweenMax.to(this.sprite2, 6, {x:moverX2, y:moverY2})

      } else {
        moverX = map(x, -60, 60, (appWidth/2)-n, (appWidth/2)+n)
        moverY = map(y, -20, 90, (appHeight/2)-n, (appHeight/2)+n)
        TweenMax.to(this.sprite1, 0.2, {x:moverX, y:moverY})
        TweenMax.to(this.sprite2, 0.5, {x:moverX, y:moverY})
      }
    }
  }


  size() {
    if (this.state.webGl) {
      const vidSize = backgroundSize(app.renderer.width, app.renderer.height, 1280, 720)
      this.vidSprite.scale.set(vidSize.scale)
      this.vidSprite.x = app.renderer.width / 2
      this.vidSprite.y = app.renderer.height / 2      
    }

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

