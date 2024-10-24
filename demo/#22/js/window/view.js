import { Bootstrap } from "../lib/bootstrap.js"
import { Sort }      from "./sort.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Storage }   from "../lib/storage.js"
import { Icon }      from "../icon.js"
import { File }      from "../file.js"

export class View{
  constructor(options){
    if(!options || !options.id){return}
    this.name = options.name
    this.id   = options.id
    if(this.opened){
      this.active()
    }
    else{
      this.add()
      this.body()
    }
  }

  get opened(){
    return Bootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"]`)
  }

  get html(){
    return Asset.get_data("window").text
  }

  get uuid(){
    return this.storage_window_data ? this.storage_window_data.id : this.id
  }

  get storage_rect(){
    return this.storage_window_data ? this.storage_window_data : null
  }

  get gap(){
    return Asset.get_data("setting").data.window.gap
  }

  get pos(){
    return Asset.get_data("setting").data.window.pos
  }

  get size(){
    return Asset.get_data("setting").data.window.size
  }

  get icons(){
    return Storage.datas.icons.filter(e => e.parent_id === this.uuid)
  }

  get window(){
    return Bootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"] .body`)
  }

  get type(){

  }

  get init_rect(){
    // 動かしていないwindow一覧の取得
    const windows = Bootstrap.elm_main.querySelectorAll(".window:not([data-move])")
    const window_rect = Bootstrap.window_rect
    const rect     = {
      x : windows.length ? windows[windows.length-1].offsetLeft + this.gap.x : this.pos.x,
      y : windows.length ? windows[windows.length-1].offsetTop  + this.gap.y : this.pos.y,
      w : this.size.w,
      h : this.size.h,
    }

    // 右下制御
    rect.x = rect.x > window_rect.width  - this.size.w ? window_rect.width  - this.size.w : rect.x
    rect.y = rect.y > window_rect.width  - this.size.w ? window_rect.width  - this.size.w : rect.y
    return rect
  }

  get icon_name(){

  }

  get storage_window_data(){
    if(Storage.datas
    && Storage.datas.windows){
      return Storage.datas.windows.find(e => e.id === this.id)
    }
    else{
      return null
    }
  }

  get storage_icon_data(){
    if(Storage.datas
    && Storage.datas.icons){
      return Storage.datas.icons.find(e => e.id === this.id)
    }
    else{
      return null
    }
  }

  add(){
    const rect = this.storage_window_data ? this.storage_rect : this.init_rect
    const data = {
      id   : this.uuid,
      name : this.get_name(this.uuid),
      icon : this.get_icon(this.uuid),
      x    : rect.x,
      y    : rect.y,
      w    : rect.w,
      h    : rect.h,
    }
    const html = new Convert(this.html, data).text
    Bootstrap.elm_main.insertAdjacentHTML("beforeend", html)
    const elm_window = Bootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"]`)
    new Sort(elm_window)
    if(!this.storage_window_data){
      this.set_storage_data(data)
    }
  }

  active(){
    new Sort(this.opened)
  }

  set_storage_data(data){
    new Storage({
      mode : "save",
      name : "windows",
      data : data,
    })
  }

  get_name(icon_id){
    if(!icon_id || !Storage.datas || !Storage.datas.icons){return}
    const icon_data = Storage.datas.icons.find(e => e.id === icon_id)
    return icon_data ? icon_data.name : ""
  }

  get_icon(icon_id){
    if(!icon_id || !Storage.datas || !Storage.datas.icons){return}
    const icon_data = Storage.datas.icons.find(e => e.id === icon_id)
    const icon = new Icon(icon_data)
    return icon_data ? `img/icon/${icon.icon}` : ""
  }

  body(){
    if(!this.storage_icon_data){return}
    switch(this.storage_icon_data.type){
      case "file":
        new File({
          mode   : "view",
          id     : this.storage_icon_data.id,
          parent : this.window,
        })
      break

      case "folder":
        new Icon({
          mode   : "view",
          data   : this.icons,
          parent : this.window,
        })
      break

      case "trash":
        new Icon({
          mode   : "view",
          data   : this.icons,
          parent : this.window,
        })
      break
    }
  }
}