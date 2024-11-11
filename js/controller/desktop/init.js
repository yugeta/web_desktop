import { ModelIcons }       from "../../model/icons.js"
import { ModelWindows }     from "../../model/windows.js"
import { ControllerWindow } from "../../controller/window.js"
import { ControllerIcon }   from "../../controller/icon.js"
import { Background }       from "./background.js"

export class Init{
  constructor(){
    this.view_icon()
    this.view_window()
    new Background()
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