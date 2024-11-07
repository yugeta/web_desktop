import { Bootstrap }  from "../../controller/lib/bootstrap.js"

export class Move{
  constructor(options){
    this.elm = options.target
    this.move(options)
  }

  move(options){
    if(!options.pos || !options.move || !options.point){return}
    // 座標移動
    const pos = this.position({
      x : options.pos.x + (options.move.x - options.point.x),
      y : options.pos.y + (options.move.y - options.point.y),
    })
    this.elm.style.setProperty("--x" , `${pos.x}px`)
    this.elm.style.setProperty("--y" , `${pos.y}px`)
    this.elm.draggable      = false
    this.elm.setAttribute("data-move", true)
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