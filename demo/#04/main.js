
class Main{
  window_default = {
    pos : {
      x: 80, 
      y: 20,
    },
    gap : {
      x: 30, 
      y: 40,
    },
    size : {
      w : 300,
      h : 200,
    },
    z : 1000
  }

  constructor(){
    this.set_event()
  }

  get elm_main(){
    return document.querySelector("main.desktop")
  }
  get window_rect(){
    return this.elm_main.getBoundingClientRect()
  }

  set_event(){
    window.addEventListener("click" , this.click.bind(this))
  }

  click(e){
    // アイコンをクリック
    const icon = e.target.closest(".icon")
    if(icon){
      const name = icon.querySelector(".name").textContent
      this.view_window({
        name : name
      })
    }
    
    // windowのクローズボタンをクリック
    const close = e.target.closest(".window .header .close")
    if(close){
      const elm_window = e.target.closest(".window")
      elm_window.parentNode.removeChild(elm_window)
    }

    // windiwをクリック
    const elm_win = e.target.closest(".window")
    if(elm_win){
      this.window_sort(elm_win)
    }
  }

  view_window(options){
    // same window don't view
    if(this.elm_main.querySelector(`.window[name="${options.name}"]`)){return}
    const elm_window = document.createElement("div")
    elm_window.className = "window"
    elm_window.name = options.name
    elm_window.innerHTML = `<div class="header">
  <span class="name">${options.name}</span>
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
    this.window_sort(elm_window)
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
      x : windows.length ? windows[windows.length-1].offsetLeft + this.window_default.gap.x : this.window_default.pos.x,
      y : windows.length ? windows[windows.length-1].offsetTop  + this.window_default.gap.y : this.window_default.pos.y,
      w : this.window_default.size.w,
      h : this.window_default.size.h,
    }

    // 右下制御
    rect.x = rect.x > this.window_rect.width  - this.window_default.size.w ? this.window_rect.width  - this.window_default.size.w : rect.x
    rect.y = rect.y > this.window_rect.width  - this.window_default.size.w ? this.window_rect.width  - this.window_default.size.w : rect.y
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

  window_sort(active_window){
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
        elm.style.zIndex = windows.length + this.window_default.z
      }
      else{
        elm.style.zIndex = num + 1 + this.window_default.z
        num++
      }
    }
  }
}


switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
  break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}