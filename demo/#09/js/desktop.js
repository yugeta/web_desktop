import { Asset } from "./lib/asset.js"
import { Icon }  from "./icon.js"

export class Desktop{
  constructor(){
    this.init()
  }

  init(){
    new Icon({
      mode : "view",
      data : Asset.get_data("setting").data.desktop_icons,
    })
  }
}