import { Icon }        from "../icon.js"
import { Window }      from "../window.js"

export class MouseMove{
  constructor(e){
    this.icon_move(e)
    this.window_move(e)
  }

  icon_move(e){
    if(!Icon.mouse_options){return}
    Icon.mouse_options.mode = "move"
    Icon.mouse_options.point = {
      x : e.pageX,
      y : e.pageY,
    }
    new Icon(Icon.mouse_options)
  }

  window_move(e){
    if(!Window.mouse_options){return}
    Window.mouse_options.move = {
      x : e.pageX,
      y : e.pageY,
    }
    new Window(Window.mouse_options)
  }

}