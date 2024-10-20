import { Bootstrap }  from "../bootstrap.js"

export class Move{
  constructor(options){
    this.move(options)
  }

  move(options){
    // 座標移動
    const pos = this.position({
      x : options.active_window.offsetLeft + options.movement.x,
      y : options.active_window.offsetTop  + options.movement.y,
      w : options.active_window.offsetWidth,
      h : options.active_window.offsetHeight,
    })

    options.active_window.style.left     =  `${pos.x}px`
    options.active_window.style.top      =  `${pos.y}px`
    options.active_window.style.position = 'absolute'
    options.active_window.draggable      = false
    options.active_window.setAttribute("data-move", true)
    options.active_window.setPointerCapture(options.pointerId)
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