

export class Resize{
  constructor(options){
    this.elm = options.target
    this.resize(options)
  }

  resize(options){
    const w = this.elm.offsetWidth  + options.movement.x
    const h = this.elm.offsetHeight + options.movement.y

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

    this.elm.setPointerCapture(options.pointerId)
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