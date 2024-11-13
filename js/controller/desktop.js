

import { ModelIcons }           from "../model/icons.js"
import { ModelWindows }         from "../model/windows.js"
import { ControllerWindow }     from "../controller/window.js"
import { ControllerIcon }       from "../controller/icon.js"
import { ControllerBackground } from "../controller/background.js"
import { EventContextMenu }     from "../event/context_menu.js"

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
        this.view_icon()
        this.view_window()
        new ControllerBackground()
      break

    }
  }

  view_icon(){
    new ControllerIcon({
      mode : "view",
      data : ModelIcons.datas,
    })
  }

  view_window(){
    new ControllerWindow({
      mode  : "init",
      datas : ModelWindows.datas,
    })
  }
}