import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Storage }   from "../lib/storage.js"
import { Icon }      from "../icon.js"
import { Window }    from "../window.js"

/**
 * 右クリックメニュー
 */

export class ContextMenu{
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
    return Bootstrap.elm_main.getBoundingClientRect()
  }

  get_target_data(elm){
    if(!elm){return}
    switch(this.mode){
      case "icon":
        const icon_id = elm.getAttribute("data-id")
        return Storage.datas.icons ? Storage.datas.icons.find(e => e.id === icon_id) : null
      case "window":
        const window_id = elm.getAttribute("data-id")
        return Storage.datas.windows ? Storage.datas.windows.find(e => e.id === window_id) : null
      case "desktop":
        return null
    }
  }

  clear(){
    const elm = Bootstrap.elm_main.querySelector(`.${this.name}`)
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
      Bootstrap.context_menu = {
        target : elm_icon
      }
      this.view_lists(Asset.get_data("setting").data.context_menu.icon)
    }

    else if(elm_window){
      this.mode = "window"
      this.options.preventDefault()
      Bootstrap.context_menu = {
        target : elm_window_body
      }
      this.view_lists(Asset.get_data("setting").data.context_menu.window)
    }

    else if(elm_desktop){
      this.mode = "desktop"
      this.options.preventDefault()
      Bootstrap.context_menu = {
        target : elm_desktop
      }
      this.view_lists(Asset.get_data("setting").data.context_menu.desktop)
    }
  }


  view_lists(lists){
    const ul = document.createElement("ul")
    ul.className = this.name
    for(const list of lists){
      if(!this.check_auth(list)){continue}
      const html = new Convert(Asset.get_data("context_menu_item").text).double_bracket(list)
      ul.insertAdjacentHTML("beforeend", html)
    }
    Bootstrap.elm_main.appendChild(ul)
    
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
          const data = this.get_target_data(Bootstrap.context_menu.target)
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
        new Icon({
          mode   : "alignment",
          target : Bootstrap.context_menu ? Bootstrap.context_menu.target : null,
        })
      break

      // ウィンドウ整列処理
      case "window_alignment":
        new Window({
          mode   : "alignment",
        })
      break

      // 新規フォルダ
      case "new_folder":
        new Icon({
          mode : "new_folder",
          target : Bootstrap.context_menu ? Bootstrap.context_menu.target : null,
        })
      break

      // アイコンの名前変更
      case "name_change":
        new Icon({
          mode   : "name_change",
          target : Bootstrap.context_menu ? Bootstrap.context_menu.target : null,
        })
      break

      // 「開く」アイコンをダブルクリックした時と同じ挙動
      case "icon_open":
        const icon = Bootstrap.context_menu.target
        const name = icon.querySelector(".name").textContent
        new Window({
          mode : "view",
          id   : icon.getAttribute("data-id"),
          name : name,
        })
      break
    }
    
  }
  
}