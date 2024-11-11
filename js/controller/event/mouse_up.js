import { Bootstrap }              from "../../controller/lib/bootstrap.js"
import { Storage }                from "../../controller/lib/storage.js"
import { Icon }                   from "../../controller/icon.js"
import { Icons }                  from "../../model/icons.js"
import { Windows }                from "../../model/windows.js"
import { Window }                 from "../../controller/window.js"

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

  get icon_elm(){
    return Bootstrap.elm_main.querySelector(`.icon[data-id="${this.icon_id}"]`)
  }

  get window_id(){
    if(!Window.mouse_options || !Window.mouse_options.target){return null}
    return Window.mouse_options.target.getAttribute("data-id")
  }

  get window_elm(){
    return Bootstrap.elm_main.querySelector(`.window[data-id="${this.window_id}"]`)
  }

  icon_end(e){
    Icon.mouse_options.mode   = "move_end"
    Icon.mouse_options.window = e.target.closest(".window")
    Icon.mouse_options.event  = e
    new Icon(Icon.mouse_options)
  }

  window_end(e){
    new Window(Window.mouse_options)
  }

  // データキャッシュ
  save_icon(){
    new Icons({
      mode : "set_icon",
      id   : this.icon_id,
    })
    new Storage({
      mode  : "save",
    })
  }

  save_window(){
    // const data = Windows.datas.find(e => e.id === this.window_id)
    // if(!data){return}
    // data.x = Number(this.window_elm.style.getPropertyValue("--x").replace("px","") || 0)
    // data.y = Number(this.window_elm.style.getPropertyValue("--y").replace("px","") || 0)
    // data.move = true
    new Windows({
      mode : "set_window",
      id   : this.window_id,
    })
    new Storage({mode  : "save"})
  }
}