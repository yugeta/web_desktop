import { Bootstrap }  from "../lib/bootstrap.js"

export class Move{
  constructor(options){
    this.elm = options.active_window
    this.move(options)
  }

  move(options){
    // 座標移動
    const pos = this.position({
      x : this.elm.offsetLeft + options.movement.x,
      y : this.elm.offsetTop  + options.movement.y,
      w : this.elm.offsetWidth,
      h : this.elm.offsetHeight,
    })

    this.elm.style.left     =  `${pos.x}px`
    this.elm.style.top      =  `${pos.y}px`
    this.elm.style.position = 'absolute'
    this.elm.draggable      = false
    this.elm.setAttribute("data-move", true)
    this.elm.setPointerCapture(options.pointerId)
  }

  position(rect){
    const window_rect = Bootstrap.window_rect

    // 左上制限
    rect.x = rect.x < 0 ? 0 : rect.x
    rect.y = rect.y < 0 ? 0 : rect.y

    // 右下制限
    rect.x = rect.x > window_rect.width  - rect.w ? window_rect.width  - rect.w : rect.x
    rect.y = rect.y > window_rect.height - rect.h ? window_rect.height - rect.h : rect.y

    return rect
  }
}