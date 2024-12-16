import { ViewWindow }                from "../view/window.js"
import { ControllerWindowSort }      from "../controller/window/sort.js"
import { ControllerWindowClose }     from "../controller/window/close.js"
import { ControllerWindowWide }      from "../controller/window/wide.js"
import { ControllerWindowResize }    from "../controller/window/resize.js"
import { ControllerWindowMove }      from "../controller/window/move.js"
import { ControllerWindowAlignment } from "../controller/window/alignment.js"
import { ControllerWindowViewType }  from "../controller/window/view_type.js"

export class ControllerWindow{
  constructor(options){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      switch(options.mode){
        case "init":
        this.init(options.datas)
        this.hash()
        break
  
        case "view":
        case "view_only":
          new ViewWindow(options).promise.then(this.finish.bind(this))
        break
  
        case "sort":
          new ControllerWindowSort(options.active_window)
        break
  
        case "close":
          new ControllerWindowClose(options.target_window)
        break
  
        case "wide":
          new ControllerWindowWide(options.active_window)
        break
  
        case "view_type":
          new ControllerWindowViewType(options.active_window)
        break
  
        case "move":
          new ControllerWindowMove(options)
        break
  
        case "resize":
          new ControllerWindowResize(options)
        break
  
        case "alignment":
          new ControllerWindowAlignment(options)
        break
      }
    })
  }

  init(datas){
    if(!datas || !datas.length){return}
    for(const data of datas){
      new ViewWindow(data)
    }
  }

  hash(){
    if(!location.hash){return}
    new ViewWindow({
      mode : "view",
      id   : location.hash.split("#")[1],
    })
  }

  finish(){
    this.resolve()
  }
}