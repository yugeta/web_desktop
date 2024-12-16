import { ControllerWindow } from "../controller/window.js"
import { EventContextMenu } from "../event/context_menu.js"
import { EventDoubleClick } from "../event/double_click.js"

export class EventClick{
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
      new ControllerWindow({
        mode : "close",
        target_window : elm_window,
      })
    }

    // window-最大化（もう一度押すと戻る）をクリック
    else if(elm_win_wide){
      const elm_window = target.closest(".window")
      new ControllerWindow({
        mode : "wide",
        active_window : elm_window,
      })
    }

    else if(view_type){
      const elm_window = target.closest(".window")
      new ControllerWindow({
        mode : "view_type",
        active_window : elm_window,
      })
    }
    
    else if(context_menu){
      // 右クリックメニューの非表示
      new EventContextMenu({mode: "clear"})
      new EventContextMenu({mode: "click", target: target})
    }
  }

  event_sp(target){
    const icon   = target.closest(".icon")
    if(icon){
      new EventDoubleClick({target : target})
    }
  }
}