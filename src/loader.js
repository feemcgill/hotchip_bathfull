import * as PIXI from 'pixi.js'
import bg from './../assets/img/bg.jpg'
import bg2 from './../assets/img/bg2.jpg'
import text_1 from './../assets/img/txt/txt_1_noband_blk.png'
import text_2 from './../assets/img/txt/txt_2_noband_blk.png'
import {TweenMax} from "gsap/TweenMax"

const loader = new PIXI.loaders.Loader()

loader
  .add('bg', bg)
  .add('bg2', bg2)
  .add('text_1', text_1)
  .add('text_2', text_2)
  .add('splotch','./../assets/vid/splotchy.mp4')




const loaderBar = document.getElementById("loader-bar")
const loadingScreen = document.getElementById('loading-screen')

loader.on('progress',function (loader,res) {
  loaderBar.style.width = loader.progress + '%';
})
loader.on('complete',function (loader,res) {
 TweenMax.to(loadingScreen, 0.2, {opacity: 0, delay: 0.6, onComplete:() => {
    loadingScreen.parentNode.removeChild(loadingScreen);
 }})
});




export default loader