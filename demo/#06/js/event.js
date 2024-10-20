import { Window } from "./window.js"

export class Event{
  constructor(){
    window.addEventListener("click" , this.click.bind(this))
    window.addEventListener("pointermove" , this.pointermove.bind(this))
  }

  click(e){
    // クリックポイントの取得
    const icon         = e.target.closest(".icon")
    const close        = e.target.closest(".window .header .close")
    const elm_win      = e.target.closest(".window")
    const elm_win_wide = e.target.closest(".window .header .wide")
    const elm_resize   = e.target.closest(".window .resize")

    // アイコンをクリック
    if(icon){
      const name = icon.querySelector(".name").textContent
      new Window({
        mode : "view",
        name : name,
      })
    }
    
    // windowのクローズボタンをクリック
    else if(close){
      const elm_window = e.target.closest(".window")
      new Window({
        mode : "close",
        target_window : elm_window,
      })
    }

    // window-最大化（もう一度押すと戻る）をクリック
    else if(elm_win_wide){
      const elm_window = e.target.closest(".window")
      new Window({
        mode : "wide",
        active_window : elm_window,
      })
    }

    // windiwをクリック
    else if(elm_win){
      new Window({
        mode : "sort",
        active_window : elm_win,
      })
    }
  }

  pointermove(e){
    if(!e.buttons){
      if(Window.move_options){
        Window.move_options = null
      }
      return
    }
    const elm_window = e.target.closest(".window")
    const elm_header = e.target.closest(".window .header")
    const elm_resize = e.target.closest(".window .resize")
    
    // Move（拡大表示の際は機能しない）
    if(elm_header && !elm_window.getAttribute("data-wide-flg")){
      Window.move_options = {
        mode : "move",
        active_window : elm_window,
      }
    }

    if(Window.move_options){
      Window.move_options.pointerId = e.pointerId
      Window.move_options.movement = {
        x : e.movementX,
        y : e.movementY,
      }
      new Window(Window.move_options)
    }

    // Resize
    
    if(elm_resize){
      Window.resize_options = {
        mode : "resize",
        type : elm_resize.getAttribute("name"),
        active_window : elm_window,
      }
    }

    if(Window.resize_options){
      Window.resize_options.pointerId = e.pointerId
      Window.resize_options.movement = {
        x : e.movementX,
        y : e.movementY,
      }
      new Window(Window.resize_options)
    }
  }
}