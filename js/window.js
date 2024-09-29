import { Bootstrap } from "./bootstrap.js"

export class Window{
  constructor(options){
    switch(options.mode){
      case "view":
        this.view(options.name)
      break

      case "sort":
        this.sort(options.active_window)
      break

      case "close":
        this.close(options.target_window)
      break
    }
  }

  get elm_main(){
    return document.querySelector("main.desktop")
  }
  get window_rect(){
    return this.elm_main.getBoundingClientRect()
  }

  view(name){
    // same window don't view
    if(this.elm_main.querySelector(`.window[name="${name}"]`)){return}
    const elm_window = document.createElement("div")
    elm_window.className = "window"
    elm_window.name = name
    elm_window.innerHTML = `<div class="header">
  <span class="name">${name}</span>
  <div class="close"></div>
</div>
<div class="body"></div>
`
    const rect = this.window_init_rect()
    elm_window.style.left   = `${rect.x}px`
    elm_window.style.top    = `${rect.y}px`
    elm_window.style.width  = `${rect.w}px`
    elm_window.style.height = `${rect.h}px`
    elm_window.addEventListener("pointermove" , this.pointermove.bind(this))
    this.elm_main.appendChild(elm_window)
    this.sort(elm_window)
  }

  sort(active_window){
    const windows = Array.from(this.elm_main.querySelectorAll(".window"))
    if(windows){
      windows.sort((a,b)=>{
        if(Number(a.style.getPropertyValue("z-index") || 0) < Number(b.style.getPropertyValue("z-index") || 0)){return -1}
        if(Number(a.style.getPropertyValue("z-index") || 0) > Number(b.style.getPropertyValue("z-index") || 0)){return +1}
        return 0
      })
    }
    let num = 0
    for(const elm of windows){
      if(elm === active_window){
        elm.style.zIndex = windows.length + Bootstrap.z
      }
      else{
        elm.style.zIndex = num + 1 + Bootstrap.z
        num++
      }
    }
  }

  close(target_window){
    target_window.parentNode.removeChild(target_window)
  }

  // window移動
  pointermove(e){
    // マウスがクリックされていない場合は処理をしない
    if(!e.buttons){return}
    const elm_window = e.target.closest(".window")

    // 座標移動
    const pos = this.window_move_pos({
      x : elm_window.offsetLeft + e.movementX,
      y : elm_window.offsetTop  + e.movementY,
      w : elm_window.offsetWidth,
      h : elm_window.offsetHeight,
    })

    elm_window.style.left     =  `${pos.x}px`
    elm_window.style.top      =  `${pos.y}px`
    elm_window.style.position = 'absolute'
    elm_window.draggable      = false
    elm_window.setAttribute("data-move", true)
    elm_window.setPointerCapture(e.pointerId)
  }

  window_init_rect(){
    const windows = this.elm_main.querySelectorAll(".window:not([data-move])")

    const rect     = {
      x : windows.length ? windows[windows.length-1].offsetLeft + Bootstrap.gap.x : Bootstrap.pos.x,
      y : windows.length ? windows[windows.length-1].offsetTop  + Bootstrap.gap.y : Bootstrap.pos.y,
      w : Bootstrap.size.w,
      h : Bootstrap.size.h,
    }

    // 右下制御
    rect.x = rect.x > this.window_rect.width  - Bootstrap.size.w ? this.window_rect.width  - Bootstrap.size.w : rect.x
    rect.y = rect.y > this.window_rect.width  - Bootstrap.size.w ? this.window_rect.width  - Bootstrap.size.w : rect.y
    return rect
  }

  window_move_pos(rect){
    // 左上制限
    rect.x = rect.x < 0 ? 0 : rect.x
    rect.y = rect.y < 0 ? 0 : rect.y

    // 右下制限
    rect.x = rect.x > this.window_rect.width  - rect.w ? this.window_rect.width  - rect.w : rect.x
    rect.y = rect.y > this.window_rect.height - rect.h ? this.window_rect.height - rect.h : rect.y

    return rect
  }
}