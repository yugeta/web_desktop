import { Bootstrap } from "../lib/bootstrap.js"
import { Sort }      from "./sort.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Storage }   from "../lib/storage.js"
import { Icon }      from "../icon.js"
import { File }      from "../file.js"
import { App }       from "../app.js"

export class View{
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

  get icon_data(){
    if(!Storage.datas || !Storage.datas.icons){return null}
    return Storage.datas.icons.find(e => e.id === this.id)
  }

  get init_rect(){
    // 動かしていないwindow一覧の取得
    const windows = Bootstrap.elm_main.querySelectorAll(".window:not([data-move])")
    const window_rect = Bootstrap.window_rect
    const window_size = this.storage_icon_data.window_size || {}
    const rect     = {
      x : windows.length ? windows[windows.length-1].offsetLeft + this.gap.x : this.pos.x,
      y : windows.length ? windows[windows.length-1].offsetTop  + this.gap.y : this.pos.y,
      w : window_size.width  || this.size.w,
      h : window_size.height || this.size.h,
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
      name : this.name,
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

  // set_window_size(){
  //   // setTimeout((()=>{
  //   // console.log(this.window.scrollWidth, this.window.scrollHeight)
  //   // }).bind(this),1000)
  //   // if(!this.storage_icon_data.window_size){return}
  //   // if(this.storage_icon_data.window_size.status === "fit"){
      
  //     const w = this.window.scrollWidth
  //     const h = this.window.scrollHeight
  //     console.log(w,h,this.window.innerHTML)
  //     // this.window.style.setProperty("--w", `${w}px`)
  //     // this.window.style.setProperty("--h", `${h}px`)
      
  //   // }
  // }

  finish(){
    this.resolve()
  }
}