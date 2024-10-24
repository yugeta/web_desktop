import { Storage }   from "../lib/storage.js"
import { Hash }      from "../system/hash.js"

export class Close{
  constructor(target_window){
    this.elm = target_window

    new Hash({
      mode : "window_close",
      id   : this.elm.getAttribute("data-id")
    })
    
    this.del_storage_data()
    target_window.parentNode.removeChild(this.elm)
  }

  del_storage_data(){
    new Storage({
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