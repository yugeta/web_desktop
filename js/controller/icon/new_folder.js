import { Icon as ViewIcon } from "../../view/icon.js"
import { Uuid }             from "../../controller/lib/uuid.js"

export class NewFolder{
  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.exec()
    })
  }

  get parent(){
    const window = this.options.target.closest(".window")
    if(window){
      return window
    }
    else{
      return null
    }
  }

  get parent_body(){
    return this.parent ? this.parent.querySelector(".body") : null
  }

  exec(){ // issue : windowにinしたフォルダをリロードすると聞ける件
    const data = {
      id   : new Uuid().id,
      name : "New Folder",
      type : "folder",
      file : null,
      parent_id : this.parent ? this.parent.getAttribute("data-id") : null
    }
    new ViewIcon(data, this.parent_body)
  }


  finish(){
    this.resolve()
  }
}