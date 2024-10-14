import { Asset }       from "../lib/asset.js"
import { Storage }     from "../lib/storage.js"
import { Window }      from "../window.js"
import { Icon }        from "../icon.js"
import { Elm2data as IconData } from "../icon/elm2data.js"

export class Init{
  constructor(){
    this.view_icon()
    this.view_window()
  }

  get setting_icons(){
    return Asset.get_data("setting").data.desktop_icons
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
  }
}