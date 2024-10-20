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
        click_element : target,
      })
    }

    // 右クリックメニューを非表示
    if(!context_menu){
      // 右クリックメニューの非表示
      new ContextMenu({mode: "clear"})
    }
  }
}