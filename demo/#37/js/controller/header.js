import { ModelStorage }   from "../model/storage.js"
import { ControllerAuth } from "../controller/auth.js"
import { ControllerIcon } from "../controller/icon.js"

export class ControllerHeader{
  constructor(){
    // this.menu.addEventListener("click" , this.menu_click.bind(this))
    window.addEventListener("click" , this.window_click.bind(this))
  }
  
  get menu(){
    return document.querySelector(`#desktop header .menu`)
  }

  menu_click(e){
    const item = e.target.closest(".item")
    if(!item){return}
    switch(item.getAttribute("data-mode")){
      case "storage-destroy":
        if(!confirm("デスクトップを初期化してもよろしいですか？")){return}
        new ModelStorage({mode: "destroy"})
      break

      case "storage-download":
        new ModelStorage({mode: "download"})
      break

      case "storage-upload":
        new ModelStorage({mode: "upload"})
      break

      case "sort-icon":
        new ControllerIcon({
          mode   : "alignment",
          target : null,
        })
      break

      // Logout
      case "logout":
        new ControllerAuth({
          mode : "logout"
        })
      break
    }
  }

  window_click(e){
    // hrefリンク起動（移動）
    if(e.target.closest("#desktop header .menu a")){
      const a = e.target.closest("a")
      this.menu_click({target : a})
      this.clear()
    }
    // プルダウンメニュー表示（非表示）
    else if(e.target.closest("#desktop header .menu label")){
      const label       = e.target.closest("label")
      const li          = label.parentNode
      const viewing_flg = li.hasAttribute("data-active")
      this.clear()
      if(viewing_flg){
        li.removeAttribute("data-active")
      }
      else{
        li.setAttribute("data-active", true)
      }
    }
    else{
      this.clear()
    }
  }

  clear(){
    const elms = this.menu.querySelectorAll("li[data-active]")
    if(!elms){return}
    for(const elm of elms){
      elm.removeAttribute("data-active")
    }
  }

}