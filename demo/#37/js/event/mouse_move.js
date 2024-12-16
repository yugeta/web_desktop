import { ControllerIcon }   from "../controller/icon.js"
import { ControllerWindow } from "../controller/window.js"

export class EventMouseMove{
  constructor(e){
    this.icon_move(e)
    this.window_move(e)
  }

  icon_move(e){
    if(!ControllerIcon.mouse_options){return}
    ControllerIcon.mouse_options.mode = "move"
    ControllerIcon.mouse_options.point = {
      x : e.pageX,
      y : e.pageY,
    }
    ControllerIcon.mouse_options.event = e
    new ControllerIcon(ControllerIcon.mouse_options)
  }

  window_move(e){
    if(!ControllerWindow.mouse_options){return}
    ControllerWindow.mouse_options.move = {
      x : e.pageX,
      y : e.pageY,
    }
    new ControllerWindow(ControllerWindow.mouse_options)
  }

}