
import { ControllerIcon }   from "../controller/icon.js"
import { Init }             from "../controller/desktop/init.js"
import { EventContextMenu } from "../event/context_menu.js"

export class ControllerDesktop{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "new_folder":
      break

      case "icon_sort":
        new ControllerIcon({
          mode : "sort",
          target : EventContextMenu.datas.target,
        })
      break

      case "init":
        new Init()
      break

    }
  }
}