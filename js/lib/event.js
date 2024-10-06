import { Icon }   from "../icon.js"
import { Window } from "../window.js"

export class Event{
  constructor(){
    window.addEventListener("mousedown"   , this.mousedown.bind(this))
    window.addEventListener("click"       , this.click.bind(this))
    window.addEventListener("dblclick"    , this.dblclick.bind(this))
    window.addEventListener("pointermove" , this.pointermove.bind(this))
  }

  mousedown(e){
    const elm_win      = e.target.closest(".window")
    const icon         = e.target.closest(".icon")

    // アイコンをクリック
    if(icon){
      new Icon({
        mode : "select",
        icon : icon,
      })
    }

    // windiwをクリック
    else if(elm_win){
      new Window({
        mode : "sort",
        active_window : elm_win,
      })
    }

    // 上記以外をクリック（各種解除処理等）
    else{
      new Icon({
        mode    : "clear",
        click_element : e.target,
      })
    }

  }

  click(e){
    // クリックしたエレメントの取得
    // const icon         = e.target.closest(".icon")
    const close        = e.target.closest(".window .header .close")
    const elm_win_wide = e.target.closest(".window .header .wide")

    // windowのクローズボタンをクリック
    if(close){
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
  }

  dblclick(e){
    // ダブルクリックしたエレメントの取得
    const icon = e.target.closest(".icon")

    // アイコンをダブルクリッククリック
    if(icon){
      const name = icon.querySelector(".name").textContent
      new Window({
        mode : "view",
        name : name,
      })
    }
  }

  // windowとiconの移動処理
  pointermove(e){

    // finish処理
    if(!e.buttons){
      if(this.pointermove_options){
        new Icon({
          mode : "move_end",
          target : this.pointermove_options.target
        })
        this.pointermove_options = null

      }
      return
    }
    
    const elm_window        = e.target.closest(".window")
    const elm_window_header = e.target.closest(".window .header")
    const elm_window_resize = e.target.closest(".window .resize")
    const elm_icon          = e.target.closest(".icon")

    // 処理継続用処理（start時処理）
    if(!this.pointermove_options){
      // Window-Move（拡大表示の際は機能しない）
      if(elm_window_header && !elm_window.getAttribute("data-wide-flg")){
        this.pointermove_options = {
          type : "window",
          mode : "move",
          target : elm_window,
        }
      }

      // Window-Resize
      if(elm_window_resize){
        this.pointermove_options = {
          type : "window",
          mode : "resize",
          name : elm_window_resize.getAttribute("name"),
          target : elm_window,
        }
      }

      // Icon-Move
      if(elm_icon){
        this.pointermove_options = {
          type   : "icon",
          mode   : "move",
          target : elm_icon,
        }
        new Icon({
          mode : "move_start",
          target : elm_icon
        })
      }
    }

    // 継続処理(move)
    else{
      this.pointermove_options.pointerId = e.pointerId
      this.pointermove_options.movement = {
        x : e.movementX,
        y : e.movementY,
      }
      switch(this.pointermove_options.type){
        case "window":
          new Window(this.pointermove_options)
        break

        case "icon":
          new Icon(this.pointermove_options)
        break
      }
    }
  }
}