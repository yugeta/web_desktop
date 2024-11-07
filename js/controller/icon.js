import { Select }     from "../controller/icon/select.js"
import { Clear }      from "../controller/icon/clear.js"
import { Icon as ViewIcon } from "../view/icon.js"
import { Move }       from "../controller/icon/move.js"
import { Alignment }  from "../controller/icon/alignment.js"
import { NewFolder }  from "../controller/icon/new_folder.js"
import { NameChange } from "../controller/icon/name_change.js"
import { Bootstrap }  from "../controller/lib/bootstrap.js"
import { Storage }    from "../controller/lib/storage.js"

export class Icon{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view":
        new ViewIcon(this.options.data,this.options.parent)
      break
      
      case "select":
        new Select(this.options.icon)
      break

      case "clear":
        new Clear(this.options.click_element)
      break

      case "move":
      case "move_end":
      case "move_start":
        new Move(this.options)
        
      break

      case "alignment":
        new Alignment(this.options)
      break

      case "new_folder":
        new NewFolder(this.options)
      break

      case "name_change":
        new NameChange(this.options)
      break

      case "name_change_end":
        new NameChange({
          mode : "end"
        })
      break
    }
  }

  get id(){
    if(this.options.id){
      return this.options.id
    }
    if(this.options.elm){
      return this.options.elm.getAttribute("data-id")
    }
  }

  get elm(){
    return this.options.elm ? this.options.elm : Bootstrap.elm_main.querySelector(`[data-id="${this.id}"]`)
  }

  get data(){
    if(this.id && Storage.datas && Storage.datas.icons){
      const data = Storage.datas.icons.find(e => e.id === this.id) || {x:0,y:0}
      data.x =  this.x || data.x
      data.y =  this.y || data.y
      return data
    }
    else{
      return null
    }
  }

  get icon(){
    if(this.options.icon){
      return this.options.icon
    }
    // else if(this.data && this.data.icon){console.log(this.data)
    //   return this.data.icon
    // }
    else{
      switch(this.options.type){
        case "file":
          return "img/icon/file.svg"
  
        case "folder":
          return "img/icon/folder.svg"

        case "trash":
          return "img/icon/trash.svg"
        
        case "app":
          return `app/${this.options.id}/icon.svg`
  
        default:
          return "img/icon/no-type.svg"
      }
    }
  }

  get name(){
    if(this.options.name){
      return this.options.name
    }
    else if(this.options.target){
      return this.options.target.split("/").pop()
    }
    else if(this.options.data){
      return this.data.name
    }
    else if(this.elm){
      return this.elm.querySelector(".name").textContent
    }
    else{
      return "undefined"
    }
  }

  get x(){
    return this.elm ? Number(this.elm.style.getPropertyValue("--x").replace("px","") || 0) : null
  }
  get y(){
    return this.elm ? Number(this.elm.style.getPropertyValue("--y").replace("px","") || 0) : null
  }
}