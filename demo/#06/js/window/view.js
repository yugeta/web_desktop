import { Bootstrap } from "../bootstrap.js"
import { Sort }      from "./sort.js"

export class View{
  constructor(name){
    this.name = name
    if(this.check()){return}
    this.add()
  }

  get html(){
    return `<div class="header">
  <span class="name">${this.name}</span>
  <div class="wide"></div>
  <div class="close"></div>
</div>
<div class="body"></div>
<div class="resize" name="horizontal"></div>
<div class="resize" name="vertical"></div>
<div class="resize" name="both"></div>
`
  }

  check(){
    return Bootstrap.elm_main.querySelector(`.window[name="${this.name}"]`)
  }

  add(){
    const elm_window = document.createElement("div")
    elm_window.className = "window"
    elm_window.name      = this.name
    elm_window.innerHTML = this.html
    const rect = this.init_rect()
    elm_window.style.left   = `${rect.x}px`
    elm_window.style.top    = `${rect.y}px`
    elm_window.style.width  = `${rect.w}px`
    elm_window.style.height = `${rect.h}px`
    Bootstrap.elm_main.appendChild(elm_window)
    new Sort(elm_window)
  }

  init_rect(){
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
}