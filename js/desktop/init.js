import { Asset }       from "../lib/asset.js"
import { Storage }     from "../lib/storage.js"
import { Window }      from "../window.js"
import { Icon }        from "../icon.js"

export class Init{
  constructor(){
    const icon_datas = this.init_icon_storage_data_merge()
    Storage.datas.icons = icon_datas
    new Icon({
      mode : "view",
      data : icon_datas,
    })
    
    new Window({
      mode  : "init",
      datas : new Storage({
        mode: "load", 
        name: "windows"
      }).datas || []
    })
  }

  get setting_icons(){
    return Asset.get_data("setting").data.desktop_icons
  }

  init_icon_storage_data_merge(){
    const setting_icons = this.setting_icons
    const storage_data  = Storage.datas.icons || []
    const icon_datas = []
    for(const setting_icon of setting_icons){
      if(!storage_data.find(e => e.id === setting_icon.id)){
        storage_data.push(setting_icon)
      }
    }
    return storage_data
  }
}