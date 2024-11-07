import { Bootstrap } from "../controller/lib/bootstrap.js"
import { Sort }      from "../controller/window/sort.js"
import { Position }  from "../controller/window/position.js"
import { Setting }   from "../model/component/setting.js"
import { Html }      from "../model/component/html.js"
import { Convert }   from "../controller/lib/convert.js"
import { Storage }   from "../controller/lib/storage.js"
import { Icon }      from "../controller/icon.js"
import { File }      from "../controller/file.js"
import { App }       from "../controller/app.js"

export class Window{
  constructor(options){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.options = options || {}
      if(!this.options.id){return}
      if(this.opened){
        this.active()
      }
      else{
        this.add()
        this.body()
        // this.set_window_size()
      }
      this.finish()
    })
  }

  get id(){
    return this.options.id
  }

  get name(){
    return this.options.name
  }

  get opened(){
    return Bootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"]`)
  }

  get html(){
    return Html.window
  }

  get uuid(){
    return this.storage_window_data ? this.storage_window_data.id : this.id
  }

  get storage_rect(){
    return this.storage_window_data ? this.storage_window_data : null
  }

  get gap(){
    return Setting.window.gap
  }

  get pos(){
    return Setting.window.pos
  }

  get size(){
    if(this.options.w && this.options.h){
      return {
        w : this.options.w,
        h : this.options.h,
      }
    }
    if(this.storage_icon_data && this.storage_icon_data.window_size){
      return {
        w : this.storage_icon_data.window_size.w,
        h : this.storage_icon_data.window_size.h,
      }
    }
    const asset_size = Setting.window.size
    if(asset_size){
      
      return {
        w : asset_size.w,
        h : asset_size.h,
      }
    }
  }

  get position(){
    return this.options.position || null
  }

  get offset(){
    return this.options.offset || null
  }

  get icons(){
    return Storage.datas.icons.filter(e => e.parent_id === this.uuid)
  }

  get window(){
    return Bootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"] .body`)
  }

  get type(){
    return this.icon_data ? this.icon_data.type : null
  }

  get icon_data(){
    if(!Storage.datas || !Storage.datas.icons){return null}
    return Storage.datas.icons.find(e => e.id === this.id)
  }

  get init_rect(){
    const window_size = this.storage_icon_data ? this.storage_icon_data.window_size || {} : {}
    const window_pos  = new Position(this)
    const rect     = {
      x : window_pos.x,
      y : window_pos.y,
      w : window_size.width  || this.size.w,
      h : window_size.height || this.size.h,
    }
    return rect
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
      name : this.name,
      type : this.type,
      icon : this.get_icon(this.uuid),
      x    : rect.x,
      y    : rect.y,
      w    : rect.w,
      h    : rect.h,
      position : this.options.position || {},
    }
    const html = new Convert(this.html, data).text
    Bootstrap.elm_main.insertAdjacentHTML("beforeend", html)
    const elm_window = Bootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"]`)
    new Sort(elm_window)
    if(this.options.mode === "view"){
      this.set_storage_data(data)
    }
  }

  active(){
    new Sort(this.opened)
  }

  set_storage_data(data){
    if(this.storage_window_data || !this.icon_data){return}
    new Storage({
      mode : "save",
      name : "windows",
      data : data,
    })
  }

  get_icon(icon_id){
    if(!icon_id || !Storage.datas || !Storage.datas.icons){return}
    const icon_data = Storage.datas.icons.find(e => e.id === icon_id)
    const icon = new Icon(icon_data)
    return icon_data ? `${icon.icon}` : ""
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

      case "app":
        new App({
          mode   : "view",
          id     : this.storage_icon_data.id,
          parent : this.window,
        })
        // .promise.then(this.set_window_size.bind(this))
      break
    }
  }

  finish(){
    this.resolve()
  }
}