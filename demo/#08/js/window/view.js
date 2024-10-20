import { Bootstrap } from "../bootstrap.js"
import { Sort }      from "./sort.js"
import { Asset }     from "../asset.js"
import { Convert }   from "../convert.js"
import { Uuid }      from "../uuid.js"

export class View{
  constructor(name){
    this.name = name
    if(this.check){return}
    this.add()
  }

  get check(){
    return Bootstrap.elm_main.querySelector(`.window[name="${this.name}"]`)
  }

  get html(){
    return Asset.get_data("window").text
  }

  get uuid(){
    return new Uuid().id
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

  add(){
    const rect = this.init_rect
    const uuid = this.uuid
    const data = {
      uuid : uuid,
      name : this.name,
      x    : rect.x,
      y    : rect.y,
      w    : rect.w,
      h    : rect.h,
    }
    const html = new Convert(this.html, data).text
    Bootstrap.elm_main.insertAdjacentHTML("beforeend", html)
    const elm_window = Bootstrap.elm_main.querySelector(`[data-uuid="${uuid}"]`)
    console.log(elm_window)
    new Sort(elm_window)
  }

  
}