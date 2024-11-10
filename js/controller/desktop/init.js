import { Icons }       from "../../model/icons.js"
import { Windows }     from "../../model/windows.js"
import { Window }      from "../../controller/window.js"
import { Icon }        from "../../controller/icon.js"
import { Background }  from "./background.js"

export class Init{
  constructor(){
    this.view_icon()
    this.view_window()
    new Background()
  }

  view_icon(){
    new Icon({
      mode : "view",
      data : Icons.datas,
    })
  }

  view_window(){
    new Window({
      mode  : "init",
      datas : Windows.datas,
    })
  }
}