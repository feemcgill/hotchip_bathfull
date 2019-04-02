import * as PIXI from 'pixi.js'
import TweenMax from 'gsap/TweenMaxBase';
import {debounce, getWindowSize, map, backgroundSize} from './helpers.js';
import Splotch from './splotch'
import Bg from './bg'
import Text from './text'
import loader from './loader'
import Cover from './cover'
import './vendor/gyro'
import GyroNorm from 'gyronorm';

const introContent = document.getElementById('intro-content')


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

  introContent.innerHTML = 'Click to enter.';

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

    // .on('mousedown', initSite)
    .on('click', () => {
      if (!state.transStarted) {
        startTrans()
        alert('click it')
      }
    })
    // .on('touchstart', () => {
    //   if (!state.transStarted) {
    //     startTrans()      
    //   }
    // })
    //.on('mouseup', onMouseUp)



  
  function startTrans() {
    state.transStarted = true
    introContent.parentNode.removeChild(introContent);
    splotch.advance(function(){
      finishTransition()
    })
    cover.out()
    text.in()      
  }


  function finishTransition() {
    state.transitioned = true
    theBg.mask = null
    splotch.alpha = 0
  }
  
  function onPointerMove(eventData) {
    var x = eventData.data.global.x;
    var y = eventData.data.global.y;
    text.move(x,y)
    bg.move(x,y)
  } 

  const gn = new GyroNorm();
  const debugDiv = document.getElementById('debug')
  gn.init({frequency: 200}).then(function(){
    gn.start(function(data){
      const shakeVibe = Math.max(data.dm.x,data.dm.y,data.dm.z)
      debugDiv.innerHTML = shakeVibe + '<br />alpha: ' + data.do.alpha + '<br />beta: ' + data.do.beta + '<br />gamma: ' + data.do.gamma;
    });
  }).catch(function(e){
    // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
    debugDiv.innerHTML = 'No Gyro, or Gyro no good'
  });


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

document.body.appendChild(app.view);
 


export {app}


