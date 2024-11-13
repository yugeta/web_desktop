import { ControllerIconSelect }     from "../controller/icon/select.js"
import { ControllerIconClear }      from "../controller/icon/clear.js"
import { ViewIcon }                 from "../view/icon.js"
import { ControllerIconMove }       from "../controller/icon/move.js"
import { ControllerIconAlignment }  from "../controller/icon/alignment.js"
import { ControllerIconNewFolder }  from "../controller/icon/new_folder.js"
import { ControllerIconNameChange } from "../controller/icon/name_change.js"
import { ModelBootstrap }           from "../model/bootstrap.js"
import { ModelStorage }             from "../model/storage.js"

export class ControllerIcon{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view":
        new ViewIcon(this.options.data,this.options.parent)
      break
      
      case "select":
        new ControllerIconSelect(this.options.icon)
      break

      case "clear":
        new ControllerIconClear(this.options.click_element)
      break

      case "move":
      case "move_end":
      case "move_start":
        new ControllerIconMove(this.options)
        
      break

      case "alignment":
        new ControllerIconAlignment(this.options)
      break

      case "new_folder":
        new ControllerIconNewFolder(this.options)
      break

      case "name_change":
        new ControllerIconNameChange(this.options)
      break

      case "name_change_end":
        new ControllerIconNameChange({mode : "end"})
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
    return this.options.elm ? this.options.elm : ModelBootstrap.elm_main.querySelector(`[data-id="${this.id}"]`)
  }

  get data(){
    if(this.id && ModelStorage.datas && ModelStorage.datas.icons){
      const data = ModelStorage.datas.icons.find(e => e.id === this.id) || {x:0,y:0}
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