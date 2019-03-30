import {Graphics} from 'pixi.js'
import {TweenMax} from "gsap/TweenMax"
import {app} from './index'

export default class Splotch extends Graphics {
  constructor(callback) {
    super()
    this.beginFill(0xFFFFFF)
    this.size()
    this.alpha = 1
  }

  in() {
    TweenMax.to(this, 0.2, {alpha: 1})
  }

  out() {
    TweenMax.to(this, 0.3, {alpha: 0, delay: 0.2})
  }

  size() {
    
    this.removeChildren()
    this.drawRect(0, 0, app.renderer.width, app.renderer.height)

  }
}



