import { Bootstrap } from "../lib/bootstrap.js"

export class Position{
  data = {
    x : 0,
    y : 0,
  }

  constructor(options){
    this.options = options || {}

    
    // const windows = Bootstrap.elm_main.querySelectorAll(".window:not([data-move])")
    
    const data    = {x : 0, y : 0}

    // let x = windows.length ? windows[windows.length-1].offsetLeft + options.gap.x : options.pos.x
    // let y = windows.length ? windows[windows.length-1].offsetTop  + options.gap.y : options.pos.y
    if(this.options.position){//console.log("assign")
      data.x = this.assign_pos.x
      data.y = this.assign_pos.y
    }
    else{
      // data.x = windows.length ? windows[windows.length-1].offsetLeft + options.gap.x : options.pos.x
      // data.y = windows.length ? windows[windows.length-1].offsetTop  + options.gap.y : options.pos.y
      data.x = this.normal_pos.x
      data.y = this.normal_pos.y
    }
    
    // 右下制御
    const rect    = Bootstrap.window_rect
    data.x = data.x > rect.width  - options.size.w ? rect.width  - options.size.w : data.x
    data.y = data.y > rect.width  - options.size.w ? rect.width  - options.size.w : data.y

    this.data = data
  }

  // 動かしていないwindow一覧の取得
  get no_moved_windows(){
    return Bootstrap.elm_main.querySelectorAll(".window:not([data-move])")
  }

  get x(){
    return this.data.x
  }

  get y(){
    return this.data.y
  }

  get position(){
    return this.options.position || {}
  }

  get offset(){
    return this.options.offset || {x:0,y:0}
  }

  get normal_pos(){
    const windows = this.no_moved_windows
    return {
      x : windows.length ? windows[windows.length-1].offsetLeft + this.options.gap.x : this.options.pos.x,
      y : windows.length ? windows[windows.length-1].offsetTop  + this.options.gap.y : this.options.pos.y,
    }
  }

  get assign_pos(){
    // const rect    = Bootstrap.window_rect
    // return {
    //   x : 0,
    //   y : 0,
    // }
    // return {
    //   x : (rect.width / 2) - (this.options.size.w / 2),
    //   y : (rect.height / 2) - (this.options.size.h / 2),
    // }
    const rect    = Bootstrap.window_rect
    let x,y

    switch(this.position.x){
      case "center":
        x = (rect.width / 2) - (this.options.size.w / 2) + this.offset.x
      break

      case "right":
        x = rect.width - this.options.size.w + this.offset.x
      break

      case "left":
      default:
        x = 0 + this.offset.x
      break
    }

    switch(this.position.y){
      case "center":
        y = (rect.height / 2) - (this.options.size.h / 2) + this.offset.y
      break

      case "bottom":
        y = rect.height - this.options.size.h + rect.top + this.offset.y
      break

      case "top":
      default:
        y = 0 + this.offset.x
      break
    }

    return {
      x : x,
      y : y,
    }
  }

}