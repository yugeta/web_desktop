
import { Icon }        from "../controller/icon.js"
import { Init }        from "../controller/desktop/init.js"
import { ContextMenu } from "../controller/event/context_menu.js"

export class Desktop{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "new_folder":
      break

      case "icon_sort":
        new Icon({
          mode : "sort",
          target : ContextMenu.datas.target,
        })
      break

      case "init":
        new Init()
      break

    }
  }
}