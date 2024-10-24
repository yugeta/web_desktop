import { Asset }       from "./lib/asset.js"
import { Icon }        from "./icon.js"
import { Window }      from "./window.js"
import { ContextMenu } from "./desktop/context_menu.js"

export class Desktop{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "context_menu":
        new ContextMenu(options)
      break

      case "new_folder":

      break

      case "icon_sort":
        new Icon({
          mode : "sort",
          target : ContextMenu.datas.target,
        })
      break

      case "init":
        this.init()
      break
    }
  }

  init(){
    new Icon({
      mode : "view",
      data : Asset.get_data("setting").data.desktop_icons,
    })
  }
}