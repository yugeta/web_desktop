import { Bootstrap } from "../lib/bootstrap.js"
import { Sort }      from "./sort.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Uuid }      from "../lib/uuid.js"
import { Storage }   from "../lib/storage.js"

export class View{
  constructor(name){
    // console.log(this.storage_data)
    // if(!this.storage_data.id){alert("error window-id");return}
    this.name = name
    this.storage_data = this.get_storage_data()
    
    if(this.opened){
      this.active()
    }
    else{
      this.add()
    }
  }

  get opened(){
    return Bootstrap.elm_main.querySelector(`.window[id="${this.uuid}"]`)
  }

  get html(){
    return Asset.get_data("window").text
  }

  get uuid(){
    return this.storage_data ? this.storage_data.id : new Uuid().id
    // if(this.storage_data){
    //   console.log(this.storage_data)
    //   return this.storage_data.find(e => e.name === this.name).id
    // }
    // else{
    //   return new Uuid().id
    // }
  }

  get storage_rect(){
    return this.storage_data ? this.storage_data.transform : null
    // return this.storage_data.find(e => e.name === this.name).transform
  }

  get init_rect(){
    // 動かしていないwindow一覧の取得
    const windows = Bootstrap.elm_main.querySelectorAll(".window:not([data-move])")
    const window_rect = Bootstrap.window_rect

    const rect     = {
      x : windows.length ? windows[windows.length-1].offsetLeft + Bootstrap.gap.x : Bootstrap.pos.x,
      y : windows.length ? windows[windows.length-1].offsetTop  + Bootstrap.gap.y : Bootstrap.pos.y,
      w : Bootstrap.size.w,
      h : Bootstrap.size.h,
    }

    // 右下制御
    rect.x = rect.x > window_rect.width  - Bootstrap.size.w ? window_rect.width  - Bootstrap.size.w : rect.x
    rect.y = rect.y > window_rect.width  - Bootstrap.size.w ? window_rect.width  - Bootstrap.size.w : rect.y
    return rect
  }

  get_storage_data(){
    const storage_data = new Storage({mode:"load",name:"windows"}).datas
    if(storage_data){
      return storage_data.find(e => e.name === this.name)
    }
    else{
      return null
    }
  }

  add(){
    const rect = this.storage_data ? this.storage_rect : this.init_rect
    const uuid = this.uuid
    const data = {
      id   : uuid,
      name : this.name,
      x    : rect.x,
      y    : rect.y,
      w    : rect.w,
      h    : rect.h,
    }
    const html = new Convert(this.html, data).text
    Bootstrap.elm_main.insertAdjacentHTML("beforeend", html)
    const elm_window = Bootstrap.elm_main.querySelector(`[id="${uuid}"]`)
    new Sort(elm_window)
    if(!this.storage_data){
      this.set_storage_data(data)
    }
  }

  active(){
    new Sort(this.opened)
  }

  set_storage_data(data){
    new Storage({
      mode : "save",
      data : {
        mode : "windows",
        id   : data.id,
        name : data.name,
        transform : {
          x : data.x,
          y : data.y,
          w : data.w,
          h : data.h,
        }
      }
    })
  }
}