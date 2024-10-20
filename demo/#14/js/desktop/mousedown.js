import { Icon }        from "../icon.js"
import { Window }      from "../window.js"
import { ContextMenu } from "../desktop/context_menu.js"

export class Mousedown{
  constructor(e){
    this.event(e.target)
  }

  event(target){
    const elm_win      = target.closest(".window")
    const icon         = target.closest(".icon")
    const context_menu = target.closest(".context_menu")

    // アイコンをクリック
    if(icon){
      this.icon(icon)
      this.window(icon.closest(".window"))
    }

    // windowをクリック
    else if(elm_win){
      this.window(elm_win)
      this.icon_unselect(target)
    }

    // 上記以外をクリック*デスクトップ（各種解除処理等）
    else{
      this.icon_unselect(target.closest(".desktop"))
    }

    // 右クリックメニューの非表示
    this.hidden_context_menu(context_menu)
  }

  icon(icon){
    if(!icon){return}
    new Icon({
      mode : "select",
      icon : icon,
    })
  }

  window(elm_win){
    if(!elm_win){return}
    new Window({
      mode : "sort",
      active_window : elm_win,
    })
  }

  icon_unselect(target){
    if(!target){return}
    new Icon({
      mode    : "clear",
      click_element : target,
    })
  }

  // 右クリックメニューを非表示
  hidden_context_menu(context_menu){
    if(context_menu){return}
    new ContextMenu({mode: "clear"})
  }
}