import { Storage }                from "../../controller/lib/storage.js"
import { Icon }                   from "../../controller/icon.js"
import { Window }                 from "../../controller/window.js"
import { Elm2data as WindowData } from "../../controller/window/elm2data.js"

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

  get icon_id(){
    if(!Icon.mouse_options || !Icon.mouse_options.target){return null}
    return Icon.mouse_options.target.getAttribute("data-id")
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
      data  : new Icon({id : this.icon_id}).data
    })
  }

  save_window(){
    const data = new WindowData(Window.mouse_options.target).datas
    if(!Storage.has_icon_data(data.id)){return}
    new Storage({
      mode : "save",
      name : "windows",
      data : data,
    })
  }
}