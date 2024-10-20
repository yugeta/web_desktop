import { Position } from "../icon/position.js"
import { Storage }  from "../lib/storage.js"
import { Elm2data } from "../icon/elm2data.js"

export class Alignment{
  constructor(options){
    this.options = options || {}
    this.move_clear()
    this.exec()
    // new Storage({
    //   mode : "del_mode",
    //   name : "name",
    //   data : {
    //     mode : "icons"
    //   }
    // })
  }

  get root(){
    return this.options.target
  }

  move_clear(){
    const icons = this.root.querySelectorAll(`:scope > .icon[data-move]`)
    if(!icons || !icons.length){return}
    for(const icon of icons){
      icon.removeAttribute("data-move")
    }
  }

  exec(){
    const icons = Array.from(this.root.querySelectorAll(`:scope > .icon`))

    // // 順番に並べ替え
    // icons.sort((a,b)=>{
    //   const a_x = a.style.getPropertyValue("--x")
    //   const a_y = a.style.getPropertyValue("--y")
    //   const b_x = b.style.getPropertyValue("--x")
    //   const b_y = b.style.getPropertyValue("--y")
    //   if(a_x < b_x && a_y < b_y){return -1}
    //   if(a_x > b_x && a_y > b_y){return +1}
    //   return 0
    // })

    // 整列移動
    for(let i=0; i<icons.length; i++){
      const icon = icons[i]
      const pos = new Position(this.root, i).datas
      icon.style.setProperty("--x", `${pos.x}px`, "")
      icon.style.setProperty("--y", `${pos.y}px`, "")

      this.save_storage(icon)
    }
  }

  save_storage(elm){
    new Storage({
      mode : "save",
      name : "icons",
      data : new Elm2data(elm).datas,
    })
  }
}