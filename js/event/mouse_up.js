import { ModelBootstrap }   from "../model/bootstrap.js"
import { ModelStorage }     from "../model/storage.js"
import { ControllerIcon }   from "../controller/icon.js"
import { ModelIcons }       from "../model/icons.js"
import { ModelWindows }     from "../model/windows.js"
import { ControllerWindow } from "../controller/window.js"

export class EventMouseUp{
  constructor(e){
    if(ControllerIcon.mouse_options){
      this.icon_end(e)
      this.save_icon()
      ControllerIcon.mouse_options = null
    }
    if(ControllerWindow.mouse_options){
      this.window_end(e)
      this.save_window()
      ControllerWindow.mouse_options = null
    }
  }

  get icon_id(){
    if(!ControllerIcon.mouse_options || !ControllerIcon.mouse_options.target){return null}
    return ControllerIcon.mouse_options.target.getAttribute("data-id")
  }

  get icon_elm(){
    return ModelBootstrap.elm_main.querySelector(`.icon[data-id="${this.icon_id}"]`)
  }

  get window_id(){
    if(!ControllerWindow.mouse_options || !ControllerWindow.mouse_options.target){return null}
    return ControllerWindow.mouse_options.target.getAttribute("data-id")
  }

  get window_elm(){
    return ModelBootstrap.elm_main.querySelector(`.window[data-id="${this.window_id}"]`)
  }

  icon_end(e){
    ControllerIcon.mouse_options.mode   = "move_end"
    ControllerIcon.mouse_options.window = e.target.closest(".window")
    ControllerIcon.mouse_options.event  = e
    new ControllerIcon(ControllerIcon.mouse_options)
  }

  window_end(e){
    new ControllerWindow(ControllerWindow.mouse_options)
  }

  // データキャッシュ
  save_icon(){
    new ModelIcons({
      mode : "set_icon",
      id   : this.icon_id,
    })
    new ModelStorage({
      mode  : "save",
    })
  }

  save_window(){
    new ModelWindows({
      mode : "set_window",
      id   : this.window_id,
    })
    new ModelStorage({mode  : "save"})
  }
}