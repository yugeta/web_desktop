import { Select }     from "./icon/select.js"
import { Clear }      from "./icon/clear.js"
import { View }       from "./icon/view.js"
import { Move }       from "./icon/move.js"
import { Alignment }  from "./icon/alignment.js"
import { NewFolder }  from "./icon/new_folder.js"
import { NameChange } from "./icon/name_change.js"

export class Icon{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view":
        new View(this.options.data,this.options.parent)
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

  get data(){
    if(this.id){
      return Storage.datas.icons.find(e => e.id === this.id)
    }
    else{
      return null
    }
  }

  get icon(){
    if(this.options.icon){
      return this.options.icon
    }
    else{
      switch(this.options.type){
        case "file":
          return "file.svg"
  
        case "folder":
          return "folder.svg"
  
        default:
          return "no-file.svg"
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
    else{
      return "undefined"
    }
  }
}