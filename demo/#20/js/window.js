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
    switch(options.mode){
      case "init":
      this.init(options.datas)
      break

      case "view":
        new View(options)
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
  }

  init(datas){
    if(!datas || !datas.length){return}
    for(const data of datas){
      new View(data)
    }
  }
}