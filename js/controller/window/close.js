import { ModelStorage }   from "../../model/storage.js"
import { ControllerHash } from "../../controller/hash.js"

export class Close{
  constructor(target_window){
    this.elm = target_window

    new ControllerHash({
      mode : "window_close",
      id   : this.elm.getAttribute("data-id")
    })
    
    this.del_storage_data()
    target_window.parentNode.removeChild(this.elm)
  }

  del_storage_data(){
    new ModelStorage({
      mode : "del_id",
      name : "windows",
      data : {
        mode : "windows",
        id   : this.elm.getAttribute("data-id"),
        name : this.elm.getAttribute("name"),
      }
    })
  }
}