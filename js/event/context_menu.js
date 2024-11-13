import { ModelBootstrap }       from "../model/bootstrap.js"
import { ComponentContextMenu } from "../component/context_menu.js"
import { ComponentHtml }        from "../component/html.js"
import { Convert }              from "../lib/convert.js"
import { ModelStorage }         from "../model/storage.js"
import { ControllerIcon }       from "../controller/icon.js"
import { ControllerWindow }     from "../controller/window.js"
import { ControllerBackground } from "../controller/background.js"
import { ControllerModal }      from "../controller/modal.js"

/**
 * 右クリックメニュー
 */

export class EventContextMenu{
  static datas = null

  constructor(options){
    this.options = options || {}
    
    switch(this.options.mode){
      case "clear":
        this.clear()
      break

      case "click":
        this.click(options.target)
      break

      default:
        this.clear()
        this.view_content(this.options.target)
    }
  }

  name = "context_menu"
  status = null

  get root_rect(){
    return ModelBootstrap.elm_main.getBoundingClientRect()
  }

  get_target_data(elm){
    if(!elm){return}
    switch(this.mode){
      case "icon":
        const icon_id = elm.getAttribute("data-id")
        return ModelStorage.datas.icons ? ModelStorage.datas.icons.find(e => e.id === icon_id) : null
      case "window":
        const window_id = elm.getAttribute("data-id")
        return ModelStorage.datas.windows ? ModelStorage.datas.windows.find(e => e.id === window_id) : null
      case "desktop":
        return null
    }
  }

  clear(){
    const elm = ModelBootstrap.elm_main.querySelector(`.${this.name}`)
    if(!elm){return}
    elm.parentNode.removeChild(elm)
  }

  view_content(target){
    if(!target){return}
    const elm_icon          = target.closest(".icon")
    const elm_window        = target.closest(".window")
    const elm_window_head   = target.closest(".window .header")
    const elm_window_body   = target.closest(".window .body")
    const elm_window_resize = target.closest(".window .resize")
    const elm_desktop       = target.closest(".desktop")

    if(elm_window_resize
    || elm_window_head){
      // e.preventDefault()
      return false
    }
    else if(elm_icon){
      this.mode = "icon"
      this.options.preventDefault()
      ModelBootstrap.context_menu = {
        target : elm_icon
      }
      this.view_lists(ComponentContextMenu.icon)
    }

    else if(elm_window){
      this.mode = "window"
      this.options.preventDefault()
      ModelBootstrap.context_menu = {
        target : elm_window_body
      }
      this.view_lists(ComponentContextMenu.window)
    }

    else if(elm_desktop){
      this.mode = "desktop"
      this.options.preventDefault()
      ModelBootstrap.context_menu = {
        target : elm_desktop
      }
      this.view_lists(ComponentContextMenu.desktop)
    }
  }


  view_lists(lists){
    const ul = document.createElement("ul")
    ul.className = this.name
    for(const list of lists){
      if(!this.check_auth(list)){continue}
      const html = new Convert(ComponentHtml.context_menu_item).double_bracket(list)
      ul.insertAdjacentHTML("beforeend", html)
    }
    ModelBootstrap.elm_main.appendChild(ul)
    
    const pos = this.position(ul)
    ul.style.setProperty("--x", `${pos.x}px` , "")
    ul.style.setProperty("--y", `${pos.y}px` , "")
  }

  check_auth(list_data){
    if(typeof list_data.auth === "undefined"){return true}
    let flg = 0
    for(const auth_key in list_data.auth){
      switch(auth_key){
        // システムデータ確認
        case "system_flg":
          const data = this.get_target_data(ModelBootstrap.context_menu.target)
          const system_flg = data && data.system_flg === true ? true : false
          flg += list_data.auth[auth_key] === system_flg ? +1 : 0

        // ログイン状態の確認
        case "login":
      }
    }
    return flg > 0 ? true : false
  }

  position(elm){
    const rect = this.root_rect
    const pos  = {
      x : this.options.pageX - rect.left,
      y : this.options.pageY - rect.top,
    }
    // 画面はみ出しを防止する
    const max  = {
      x : rect.width  - elm.offsetWidth,
      y : rect.height - elm.offsetHeight,
    }
    return {
      x : pos.x > max.x ? max.x : pos.x,
      y : pos.y > max.y ? max.y : pos.y,
    }
  }

  click(target){
    const item = target.closest(".item")
    if(!item){return}
    switch(item.getAttribute("data-mode")){
      // アイコン整列処理
      case "icon_alignment":
        new ControllerIcon({
          mode   : "alignment",
          target : ModelBootstrap.context_menu ? ModelBootstrap.context_menu.target : null,
        })
      break

      // ウィンドウ整列処理
      case "window_alignment":
        new ControllerWindow({
          mode   : "alignment",
        })
      break

      // 新規フォルダ
      case "new_folder":
        new ControllerIcon({
          mode : "new_folder",
          target : ModelBootstrap.context_menu ? ModelBootstrap.context_menu.target : null,
        })
      break

      // アイコンの名前変更
      case "name_change":
        new ControllerIcon({
          mode   : "name_change",
          target : ModelBootstrap.context_menu ? ModelBootstrap.context_menu.target : null,
        })
      break

      // 「開く」アイコンをダブルクリックした時と同じ挙動
      case "icon_open":
        const icon = ModelBootstrap.context_menu.target
        const name = icon.querySelector(".name").textContent
        new ControllerWindow({
          mode : "view",
          id   : icon.getAttribute("data-id"),
          name : name,
        })
      break

      // 壁紙の変更
      case "change_background":
        new ControllerBackground({mode: "view_modal"})
      break

      // アラート表示
      case "view_modal":
        // new Modal("アラート表示なう！！")
        new ControllerModal({
          message : "アラート表示なう！！",
          buttons : [
            {
              key : "success",
              name : "OK",
              callback : (()=>{console.log("click-ok")}),
            },
            {
              key : "error",
              name : "NG",
              callback : (()=>{console.log("click-ng")}),
            },
            {
              key : "close",
              name : "閉じる",
            }
          ]
        })
      break
    }
    
  }
  
}