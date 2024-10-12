import { Storage }   from "../lib/storage.js"

export class Close{
  constructor(target_window){
    this.del_storage_data(target_window)
    target_window.parentNode.removeChild(target_window)
  }

  del_storage_data(elm){
    new Storage({
      mode : "del_id",
      name : "windows",
      data : {
        mode : "windows",
        id   : elm.getAttribute("data-id"),
        name : elm.getAttribute("name"),
      }
    })
  }
}