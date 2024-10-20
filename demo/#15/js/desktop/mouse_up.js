import { Storage }                from "../lib/storage.js"
import { Icon }                   from "../icon.js"
import { Window }                 from "../window.js"
import { Elm2data as IconData }   from "../icon/elm2data.js"
import { Elm2data as WindowData } from "../window/elm2data.js"

export class MouseUp{
  constructor(e){
    if(Icon.mouse_options){
      this.icon_end(e)
      this.save_icon()
      Icon.mouse_options = null
    }
    if(Window.mouse_options){
      this.window_end(e)
      this.save_window()
      Window.mouse_options = null
    }
  }

  icon_end(e){
    Icon.mouse_options.mode = "move_end"
    Icon.mouse_options.window = e.target.closest(".window")
    Icon.mouse_options.event = e
    new Icon(Icon.mouse_options)
  }

  window_end(e){
    new Window(Window.mouse_options)
  }

  // データキャッシュ
  save_icon(){
    new Storage({
      mode  : "save",
      name  : "icons",
      data  : new IconData(Icon.mouse_options.target).datas,
    })
  }

  save_window(){
    new Storage({
      mode : "save",
      name : "windows",
      data : new WindowData(Window.mouse_options.target).datas,
    })
  }
}