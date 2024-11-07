export class Resize{
  constructor(options){
    this.elm = options.target
    this.resize(options)
  }

  resize(options){
    const w = options.size.w  + (options.move.x - options.point.x)
    const h = options.size.h  + (options.move.y - options.point.y)

    switch(options.name){
      case "horizontal":
       this.horizontal(w)
      break
      
      case "vertical":
        this.vertical(h)
      break

      case "both":
        this.both(w,h)
      break
    }
  }

  horizontal(w){
    this.elm.style.setProperty("--w"  , `${w}px` , "")
  }
  vertical(h){
    this.elm.style.setProperty("--h"  , `${h}px` , "")
  }
  both(w,h){
    this.elm.style.setProperty("--w"  , `${w}px` , "")
    this.elm.style.setProperty("--h"  , `${h}px` , "")
  }
}