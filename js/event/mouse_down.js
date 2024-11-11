import { ControllerIcon }   from "../controller/icon.js"
import { ControllerWindow } from "../controller/window.js"
import { EventContextMenu } from "../event/context_menu.js"

export class EventMouseDown{
  constructor(e){
    this.event(e)
  }

  event(e){
    const icon              = e.target.closest(".icon")
    const context_menu      = e.target.closest(".context_menu")
    const elm_window        = e.target.closest(".window")
    const elm_window_header = e.target.closest(".window .header")
    const elm_window_resize = e.target.closest(".window .resize")

    // アイコンをクリック
    if(icon){
      this.icon_push(icon)
      this.icon_move_init(icon,e)
      this.window_push(icon.closest(".window"))
    }

    // Window-Move（拡大表示の際は機能しない）
    if(elm_window_header && !elm_window.getAttribute("data-wide-flg")){
      this.window_move_init(elm_window, e)
    }

    // Window-Resize
    if(elm_window_resize){
    this.window_resize_init(elm_window_resize, e)
    }

    // windowをクリック
    if(elm_window){
      this.window_push(elm_window)
      this.icon_unselect(e.target)
    }

    // デスクトップをクリック（各種解除処理等）
    else if(!icon && !elm_window){
      this.icon_unselect(e.target.closest(".desktop"))
    }

    // 右クリックメニューの非表示
    this.hidden_context_menu(context_menu)

    new ControllerIcon({
      mode : "name_change_end"
    })
  }

  icon_push(icon){
    if(!icon){return}
    new ControllerIcon({
      mode : "select",
      icon : icon,
    })
    new ControllerIcon({
      mode : "sort",
      icon : icon,
    })
  }

  icon_move_init(icon, e){
    const rect = icon.getBoundingClientRect()
    ControllerIcon.mouse_options = {
      mode   : "move_start",
      target : icon,
      point  : {
        x : e.pageX,
        y : e.pageY,
      },
      diff : {
        x : e.pageX - rect.left,
        y : e.pageY - rect.top,
      },
      rect   : rect,
      first_window : icon.closest(".window"),
    }
    new ControllerIcon(ControllerIcon.mouse_options)
  }

  window_move_init(elm_window, e){
    ControllerWindow.mouse_options = {
      mode   : "move",
      target : elm_window,
      point  : {
        x : e.pageX,
        y : e.pageY,
      },
      pos : {
        x : elm_window.offsetLeft,
        y : elm_window.offsetTop,
      },
    }
  }

  window_resize_init(elm_window_resize, e){
    const elm_window = elm_window_resize.closest(".window")
    ControllerWindow.mouse_options = {
      mode   : "resize",
      name   : elm_window_resize.getAttribute("name"),
      target : elm_window_resize.closest(".window"),
      point  : {
        x : e.pageX,
        y : e.pageY,
      },
      size : {
        w : elm_window.offsetWidth,
        h : elm_window.offsetHeight,
      },
    }
  }

  window_push(elm_win){
    if(!elm_win){return}
    new ControllerWindow({
      mode : "sort",
      active_window : elm_win,
    })
  }

  icon_unselect(target){
    if(!target){return}
    new ControllerIcon({
      mode    : "clear",
      click_element : target,
    })
  }

  // 右クリックメニューを非表示
  hidden_context_menu(context_menu){
    if(context_menu){return}
    new EventContextMenu({mode: "clear"})
  }
}