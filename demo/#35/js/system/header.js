import { Storage } from "../lib/storage.js"
import { Auth }      from "../system/auth.js"
import { Icon }       from "../icon.js"

export class Header{
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
        new Storage({mode: "destroy"})
      break

      case "storage-download":
        new Storage({mode: "download"})
      break

      case "storage-upload":
        new Storage({mode: "upload"})
      break

      case "sort-icon":
        new Icon({
          mode   : "alignment",
          target : null,
        })
      break

      // Logout
      case "logout":
        new Auth({
          mode : "logout"
        })
      break
    }
  }

  window_click(e){
    if(e.target.closest("#desktop header .menu a")){
      const a = e.target.closest("a")
      this.menu_click({target : a})
      this.clear()
    }
    else if(e.target.closest("#desktop header .menu label")){
      const label = e.target.closest("label")
      const li    = label.parentNode
      const flg   = li.hasAttribute("data-active")
      this.clear()
      if(flg){
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