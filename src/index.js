import * as PIXI from 'pixi.js'
import TweenMax from 'gsap/TweenMaxBase';
import {debounce, getWindowSize, map, backgroundSize} from './helpers.js';
import Splotch from './splotch'
import Bg from './bg'
import Text from './text'
import loader from './loader'
import Cover from './cover'
import './vendor/gyro'
import GyroNorm from 'gyronorm'
import './dom.js'

const introScreen = document.getElementById('intro-screen')
const introButton = document.getElementById('play-button')

loader.load((loader, resources) => {
  const state = {
    transitioned: false,
    transStarted: false,
    instructionsFollowed: false
  }
  const theBg = new PIXI.Container()
  const bg = new Bg()
  const splotch = new Splotch()
  const text = new Text()
  const cover = new Cover()

  introButton.addEventListener('click', function (e) {
    if (!state.transStarted) {
      startTrans()      
    }
  });

  TweenMax.to(introButton,3, {opacity: 1, delay: 1})

  theBg.addChild(bg)
  theBg.addChild(text)
  app.stage.addChild(theBg)

  app.stage.addChild(splotch)
  app.stage.addChild(cover)

  theBg.mask = splotch

  app.stage.interactive = true;
  app.stage
    .on('mousemove', onPointerMove)
    .on('touchmove', onPointerMove)


  
  function startTrans() {
    state.transStarted = true
    TweenMax.to(introScreen, 1.5, {opacity: 0, delay: 0, onComplete:() => {
      introScreen.parentNode.removeChild(introScreen);
      splotch.advance(function(){
        finishTransition()
      })
      cover.out()
      text.in()        
    }})    
    
  }


  function finishTransition() {
    state.transitioned = true
    theBg.mask = null
    splotch.alpha = 0
    document.body.classList.add('intro-animation-complete')
  }
  
  function onPointerMove(eventData) {
    var x = eventData.data.global.x;
    var y = eventData.data.global.y;
    text.move(x,y)
    bg.move(x,y)
  } 

  const gn = new GyroNorm();
  gn.init().then(function(){
    gn.start(function(data){
      const shakeVibe = Math.max(data.dm.x,data.dm.y,data.dm.z)
      text.move(data.do.gamma, data.do.beta, true)
      bg.move(data.do.gamma, data.do.beta, true)

    });
  }).catch(function(e){});


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
    cover.size()
  }));    
});




//Create the renderer
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor : 0xFFFFFF,
  // forceCanvas : true
});


document.getElementById('vibe-container').appendChild(app.view);
 


export {app}


