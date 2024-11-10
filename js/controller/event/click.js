import { Window }      from "../../controller/window.js"
import { ContextMenu } from "../../controller/event/context_menu.js"
import { DoubleClick } from "../../controller/event/double_click.js"

export class Click{
  constructor(e){
    this.event(e.target)
    // スマホ（タッチイベントがある場合）
    if(window.ontouchstart !== undefined){
      this.event_sp(e.target)
    }
  }

  // クリックしたエレメントの取得
  event(target){
    const close        = target.closest(".window .header .close")
    const elm_win_wide = target.closest(".window .header .wide")
    const view_type    = target.closest(".window .header .view-type")
    const context_menu = target.closest(".context_menu")

    // windowのクローズボタンをクリック
    if(close){
      const elm_window = target.closest(".window")
      new Window({
        mode : "close",
        target_window : elm_window,
      })
    }

    // window-最大化（もう一度押すと戻る）をクリック
    else if(elm_win_wide){
      const elm_window = target.closest(".window")
      new Window({
        mode : "wide",
        active_window : elm_window,
      })
    }

    else if(view_type){
      const elm_window = target.closest(".window")
      new Window({
        mode : "view_type",
        active_window : elm_window,
      })
    }
    
    else if(context_menu){
      // 右クリックメニューの非表示
      new ContextMenu({mode: "clear"})
      new ContextMenu({mode: "click", target: target})
    }
  }

  event_sp(target){
    const icon   = target.closest(".icon")
    if(icon){
      new DoubleClick({target : target})
    }
  }
}