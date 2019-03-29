import * as PIXI from 'pixi.js'
import texUrl from './../assets/img/bg.jpg'
import text_1 from './../assets/img/txt/txt_1_noband_blk.png'
import text_2 from './../assets/img/txt/txt_2_noband_blk.png'

const loader = new PIXI.loaders.Loader()

loader
  .add('bg', texUrl)
  .add('text_1', text_1)
  .add('text_2', text_2)
  .add('splotch','./../assets/vid/splotchy.mp4')

// loader.on('progress',function (res) {
// })
// loader.on('complete',function (loader,res) {
//   initSite()
// });
// loader.load((loader, resources) => {
// });

export default loader