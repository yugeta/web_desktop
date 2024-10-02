import { View }      from "./window/view.js"
import { Sort }      from "./window/sort.js"
import { Close }     from "./window/close.js"
import { Wide }      from "./window/wide.js"
import { Resize }    from "./window/resize.js"
import { Move }      from "./window/move.js"

export class Window{
  constructor(options){
    switch(options.mode){
      case "view":
        new View(options.name)
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

      case "move":
        new Move(options)
      break

      case "resize":
        new Resize(options)
      break
    }
  }
}