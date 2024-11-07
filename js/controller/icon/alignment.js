import { Position }  from "../../controller/icon/position.js"
import { Storage }   from "../../controller/lib/storage.js"
import { Trash }     from "../../controller/icon/trash.js"
import { Icon }      from "../../controller/icon.js"
import { Bootstrap } from "../../controller/lib/bootstrap.js"

export class Alignment{
  constructor(options){
    this.options = options || {}
    this.move_clear()
    this.sort_icon()
    this.sort_trash()
  }

  get root(){
    return this.options.target || Bootstrap.elm_main
  }

  move_clear(){
    const icons = this.root.querySelectorAll(`:scope > .icon[data-move]`)
    if(!icons || !icons.length){return}
    for(const icon of icons){
      icon.removeAttribute("data-move")
    }
  }

  sort_icon(){
    const icons = Array.from(this.root.querySelectorAll(`:scope > .icon:not([type="trash"])`))

    // 整列移動
    for(let i=0; i<icons.length; i++){
      const icon = icons[i]
      const pos = new Position(this.root, i).datas
      icon.style.setProperty("--x", `${pos.x}px`, "")
      icon.style.setProperty("--y", `${pos.y}px`, "")

      this.save_storage(icon)
    }
  }

  sort_trash(){
    const trash = this.root.querySelector(`:scope > .icon[type="trash"]`)
    if(!trash){return}
    const pos = new Trash().fixed_position
    trash.style.setProperty("--x", `${pos.x}px`, "")
    trash.style.setProperty("--y", `${pos.y}px`, "")
  }

  save_storage(elm){
    new Storage({
      mode : "save",
      name : "icons",
      data : new Icon({elm:elm}),
    })
  }
}