import * as PIXI from 'pixi.js'
import TweenMax from 'gsap/TweenMaxBase';
import {debounce, getWindowSize, map, backgroundSize} from './helpers.js';
import Splotch from './splotch'
import Bg from './bg'
import Text from './text'
import loader from './loader'

//Create the renderer
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor : 0xFFFFFF,
  // forceCanvas : true
});

document.body.appendChild(app.view);

loader.load((loader, resources) => {
  initSite()
});


let splotch
let bg
let text

function initSite() {
  const theBg = new PIXI.Container()
  bg = new Bg()
  splotch = new Splotch()
  text = new Text()

  theBg.addChild(bg)
  theBg.addChild(text)
  app.stage.addChild(theBg)

  app.stage.addChild(splotch)
  theBg.mask = splotch

  app.stage.interactive = true;
  app.stage
    .on('mousemove', onPointerMove)
    .on('touchmove', onPointerMove)

  function onPointerMove(eventData) {
    var x = eventData.data.global.x;
    var y = eventData.data.global.y;
    text.move(x,y)
    bg.move(x,y)
  } 
}



/** RESIZE **/
/** RESIZE **/
/** RESIZE **/
window.addEventListener("resize",function(e){
  const size = getWindowSize();
  const w = size.width;
  const h = size.height;
  // Scale renderer
  app.renderer.view.style.width = w + "px";    
  app.renderer.view.style.height = h + "px";      
  app.renderer.resize(w,h); 
});
  
window.addEventListener("resize",debounce(function(e){
  // Scale scenes
  bg.size()
  splotch.size()
  text.size()
}));  


export {app}


