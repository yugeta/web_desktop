import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"

/**
 * 右クリックメニュー
 */

export class ContextMenu{
  static datas = null

  constructor(e){
    this.clear()
    if(!e.target){return}
    this.pageX = e.pageX
    this.pageY = e.pageY
    this.event(e)
  }

  name = "context_menu"

  get root_rect(){
    return Bootstrap.elm_main.getBoundingClientRect()
  }

  clear(){
    const elm = Bootstrap.elm_main.querySelector(`.${this.name}`)
    if(!elm){return}
    elm.parentNode.removeChild(elm)
  }

  event(e){
    const elm_icon    = e.target.closest(".icon")
    const elm_window  = e.target.closest(".window .body")
    const elm_desktop = e.target.closest(".desktop")

    if(elm_icon){
      e.preventDefault()
 
    }

    else if(elm_window){
      e.preventDefault()
      Bootstrap.context_menu = {
        target : elm_window
      }
      this.view_lists(Asset.get_data("setting").data.context_menu.window)
    }

    else if(elm_desktop){
      e.preventDefault()
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
      const html = new Convert(Asset.get_data("context_menu_item").text).double_bracket(list)
      ul.insertAdjacentHTML("beforeend", html)
    }
    Bootstrap.elm_main.appendChild(ul)
    
    const pos = this.position(ul)
    ul.style.setProperty("--x", `${pos.x}px` , "")
    ul.style.setProperty("--y", `${pos.y}px` , "")

  }

  position(elm){
    const rect = this.root_rect
    const pos  = {
      x : this.pageX - rect.left,
      y : this.pageY - rect.top,
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
  
}