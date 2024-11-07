import { Icons }       from "../../model/component/icons.js"
import { Windows }     from "../../model/component/windows.js"
import { Storage }     from "../../controller/lib/storage.js"
import { Window }      from "../../controller/window.js"
import { Icon }        from "../../controller/icon.js"
import { Background }  from "./background.js"
import { Elm2data as IconData } from "../../controller/icon/elm2data.js"

export class Init{
  constructor(){
    this.view_icon()
    this.view_window()
    new Background()
  }

  get setting_icons(){
    return Icons
  }
  get setting_windows(){
    return Windows || null
  }

  init_icon_storage_data_merge(){
    const setting_icons = this.setting_icons
    const storage_data  = Storage.datas.icons || []
    for(const setting_icon of setting_icons){
      if(!storage_data.find(e => e.id === setting_icon.id)){
        storage_data.push(setting_icon)
      }
    }
    return storage_data
  }

  view_icon(){
    const icon_datas = this.init_icon_storage_data_merge()
    const icon = new Icon({
      mode : "view",
      data : icon_datas,
    })
    if(icon.elm){
      Storage.datas.icons = new IconData(icon.elm)
    }
    else{
      Storage.datas.icons = icon_datas
    }
  }

  view_window(){
    new Window({
      mode  : "init",
      datas : new Storage({
        mode: "load", 
        name: "windows"
      }).datas || []
    })
    new Window({
      mode  : "init",
      datas : this.setting_windows,
    })
  }
}