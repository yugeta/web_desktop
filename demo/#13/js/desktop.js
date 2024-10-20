import { Asset }       from "./lib/asset.js"
import { Storage }     from "./lib/storage.js"
import { Icon }        from "./icon.js"
import { Window }      from "./window.js"
import { ContextMenu } from "./desktop/context_menu.js"

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
        this.init()
      break

    }
  }

  init(){
    new Icon({
      mode : "view",
      data : Asset.get_data("setting").data.desktop_icons,
    })
    new Window({
      mode  : "init",
      datas : new Storage({mode: "load", name: "windows"}).datas || []
    })
  }
}