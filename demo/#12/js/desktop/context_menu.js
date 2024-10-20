import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"

/**
 * 右クリックメニュー
 */

export class ContextMenu{
  static datas = null

  constructor(options){
    this.options = options || {}
    this.clear()
    switch(this.options.type){
      case "icon":

      break

      case "window":

      break

      case "desktop":
        Bootstrap.context_menu = {
          target : this.options.target
        }
        this.view_lists(Asset.get_data("setting").data.context_menu.desktop)
      break
    }
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

  view_lists(lists){
    const ul = document.createElement("ul")
    ul.className = this.name
    for(const list of lists){
      const html = new Convert(Asset.get_data("context_menu_item").text).double_bracket(list)
      ul.insertAdjacentHTML("beforeend", html)
    }
    Bootstrap.elm_main.appendChild(ul)
    
    const pos = this.position()
    ul.style.setProperty("--x", `${pos.x}px` , "")
    ul.style.setProperty("--y", `${pos.y}px` , "")

  }

  position(elm){
    const rect = this.root_rect
    return {
      x : this.options.event.pageX - rect.left,
      y : this.options.event.pageY - rect.top,
    }
  }
}