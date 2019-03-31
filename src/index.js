import * as PIXI from 'pixi.js'
import TweenMax from 'gsap/TweenMaxBase';
import {debounce, getWindowSize, map, backgroundSize} from './helpers.js';
import Splotch from './splotch'
import Bg from './bg'
import Text from './text'
import loader from './loader'
import Cover from './cover'
import './vendor/gyro'
// import { GyroNorm } from 'gyronorm';
import GyroNorm from 'gyronorm';


loader.load((loader, resources) => {
  const state = {
    transitioned: false,
    transStarted: false,
    vidInit: false,
  }
  const theBg = new PIXI.Container()
  const bg = new Bg()
  const splotch = new Splotch()
  const text = new Text()
  const cover = new Cover()

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
      console.log('CLICK')
      initSite()
      //startTrans()
    })
    .on('touchstart', () => {
      console.log('CLICK')
      initSite()
      //startTrans()      
    })
    //.on('mouseup', onMouseUp)

  // let lastmousex=-1 
  // let lastmousey=-1
  // let mousetravel = 0

  let timeout = null
  function initSite() {
    if (!state.vidInit) {
      splotch.init()
      state.vidInit = true
    }
  }
  function onPointerMove(eventData) {
    var x = eventData.data.global.x;
    var y = eventData.data.global.y;
    text.move(x,y)
    bg.move(x,y)

    // mousetravel = Math.round(Math.max( Math.abs(x-lastmousex), Math.abs(y-lastmousey) ))
    // lastmousex = x;
    // lastmousey = y;

    if (!state.transStarted) {
        startTrans()
    }
    clearTimeout(timeout);
    timeout = setTimeout(function(){
      console.log('MOUS IS IDLE')
      retractTrans()
    }, 100);



  } 

  function startTrans() {
    state.transStarted = true

    if (!state.transitioned && state.vidInit) {
      splotch.advance(function(){
        finishTransition()
      })
      cover.out()
      text.in()      
    }
  }

  function retractTrans() {
    state.transStarted = false
    if (!state.transitioned) {
      splotch.retract()
      cover.in()
      text.out()
    }
  }

  function finishTransition() {
    state.transitioned = true
    theBg.mask = null
    splotch.alpha = 0
  }
  

  const gn = new GyroNorm({frequency: 100});
  const debugDiv = document.getElementById('debug')
  gn.init().then(function(){
    gn.start(function(data){
      console.log('got gyro')
      // Process:
      // data.do.alpha	( deviceorientation event alpha value )
      // data.do.beta		( deviceorientation event beta value )
      // data.do.gamma	( deviceorientation event gamma value )
      // data.do.absolute	( deviceorientation event absolute value )
  
      // data.dm.x		( devicemotion event acceleration x value )
      // data.dm.y		( devicemotion event acceleration y value )
      // data.dm.z		( devicemotion event acceleration z value )
      const shakeVibe = Math.max(data.dm.x,data.dm.y,data.dm.z)
      debugDiv.innerHTML = shakeVibe + '<br />alpha: ' + data.do.alpha + '<br />beta: ' + data.do.beta + '<br />gamma: ' + data.do.gamma;

      // data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
      // data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
      // data.dm.gz		( devicemotion event accelerationIncludingGravity z value )
  
      // data.dm.alpha	( devicemotion event rotationRate alpha value )
      // data.dm.beta		( devicemotion event rotationRate beta value )
      // data.dm.gamma	( devicemotion event rotationRate gamma value )
    });
  }).catch(function(e){
    // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
    console.log('No Gyro, or Gyro no good')
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


