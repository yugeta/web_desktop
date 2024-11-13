import { ModelBootstrap }           from "../model/bootstrap.js"
import { ControllerWindowSort }     from "../controller/window/sort.js"
import { ControllerWindowPosition } from "../controller/window/position.js"
import { ComponentSetting }         from "../component/setting.js"
import { ComponentHtml }            from "../component/html.js"
import { Convert }                  from "../lib/convert.js"
import { ModelStorage }             from "../model/storage.js"
import { ModelIcons }               from "../model/icons.js"
import { ModelWindows }             from "../model/windows.js"
import { ControllerIcon }           from "../controller/icon.js"
import { ControllerFile }           from "../controller/file.js"
import { ControllerApp }            from "../controller/app.js"

export class ViewWindow{
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
    return ModelBootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"]`)
  }

  get html(){
    return ComponentHtml.window
  }

  get uuid(){
    return this.storage_window_data ? this.storage_window_data.id : this.id
  }

  get storage_rect(){
    return this.storage_window_data ? this.storage_window_data : null
  }

  get gap(){
    return ComponentSetting.window.gap
  }

  get pos(){
    return ComponentSetting.window.pos
  }

  get size(){
    if(this.options.w && this.options.h){
      return {
        w : this.options.w,
        h : this.options.h,
      }
    }
    if(this.window_data && this.window_data.window_size){
      return {
        w : this.window_data.window_size.w,
        h : this.window_data.window_size.h,
      }
    }
    const asset_size = ComponentSetting.window.size
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
    return ModelIcons.datas.filter(e => e.parent_id === this.uuid)
  }

  get window(){
    return ModelBootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"] .body`)
  }

  get type(){
    return this.icon_data ? this.icon_data.type : null
  }

  get icon_data(){
    return ModelIcons.datas.find(e => e.id === this.id)
  }

  get window_data(){
    return ModelWindows.datas.find(e => e.id === this.id)
  }

  get init_rect(){
    const window_size = this.size || {}
    const window_pos  = new ControllerWindowPosition(this)
    const rect     = {
      x : window_pos.x,
      y : window_pos.y,
      w : window_size.width  || this.size.w,
      h : window_size.height || this.size.h,
    }
    return rect
  }

  get storage_window_data(){
    if(ModelWindows.datas){
      return ModelWindows.datas.find(e => e.id === this.id)
    }
    else{
      return null
    }
  }

  get storage_icon_data(){
    if(ModelStorage.datas
    && ModelStorage.datas.icons){
      return ModelStorage.datas.icons.find(e => e.id === this.id)
    }
    else{
      return null
    }
  }

  add(){
    const rect = this.init_rect
    const data = {
      id   : this.uuid,
      name : this.name,
      type : this.type,
      icon : this.get_icon(this.uuid),
      x    : rect.x,
      y    : rect.y,
      w    : rect.w,
      h    : rect.h,
      z    : this.window_data ? this.window_data.z : "",
      position : this.options.position || {},
    }
    const html = new Convert(this.html, data).text
    ModelBootstrap.elm_main.insertAdjacentHTML("beforeend", html)
    const elm_window = ModelBootstrap.elm_main.querySelector(`.window[data-id="${this.uuid}"]`)
    new ControllerWindowSort(elm_window)
    if(this.options.mode === "view"){
      this.set_storage_data(data)
    }
  }

  active(){
    new ControllerWindowSort(this.opened)
  }

  set_storage_data(data){
    if(this.storage_window_data || !this.icon_data){return}
    new ModelStorage({
      mode : "save",
      name : "windows",
      data : data,
    })
  }

  get_icon(icon_id){
    if(!icon_id || !ModelStorage.datas || !ModelStorage.datas.icons){return}
    const icon_data = ModelStorage.datas.icons.find(e => e.id === icon_id)
    const icon = new ControllerIcon(icon_data)
    return icon_data ? `${icon.icon}` : ""
  }

  body(){
    if(!this.storage_icon_data){return}
    switch(this.storage_icon_data.type){
      case "file":
        new ControllerFile({
          mode   : "view",
          id     : this.storage_icon_data.id,
          parent : this.window,
        })
      break

      case "folder":
        new ControllerIcon({
          mode   : "view",
          data   : this.icons,
          parent : this.window,
        })
      break

      case "trash":
        new ControllerIcon({
          mode   : "view",
          data   : this.icons,
          parent : this.window,
        })
      break

      case "app":
        new ControllerApp({
          mode   : "view",
          id     : this.storage_icon_data.id,
          parent : this.window,
        })
      break
    }
  }

  finish(){
    this.resolve()
  }
}