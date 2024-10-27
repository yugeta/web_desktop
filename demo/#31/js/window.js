import { View }      from "./window/view.js"
import { Sort }      from "./window/sort.js"
import { Close }     from "./window/close.js"
import { Wide }      from "./window/wide.js"
import { Resize }    from "./window/resize.js"
import { Move }      from "./window/move.js"
import { Alignment } from "./window/alignment.js"
import { ViewType }  from "./window/view_type.js"

export class Window{
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
          new View(options).promise.then(this.finish.bind(this))
        break
  
        case "sort":
          new Sort(options.active_window)
        break
  
        case "close":
          new Close(options.target_window)
        break
  
        case "wide":
          new Wide(options.active_window)
        break
  
        case "view_type":
          new ViewType(options.active_window)
        break
  
        case "move":
          new Move(options)
        break
  
        case "resize":
          new Resize(options)
        break
  
        case "alignment":
          new Alignment(options)
        break
      }
    })
  }

  init(datas){
    if(!datas || !datas.length){return}
    for(const data of datas){
      new View(data)
    }
  }

  hash(){
    if(!location.hash){return}
    new View({
      mode : "view",
      id   : location.hash.split("#")[1],
    })
  }

  finish(){
    this.resolve()
  }
}