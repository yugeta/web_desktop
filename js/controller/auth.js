import { ModelBootstrap } from "../model/bootstrap.js"
import { ModelStorage }   from "../model/storage.js"
import { Google }         from "../lib/google.js"

/**
 * ログイン処理
 */

export class ControllerAuth{
  name = "google_auth"

  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "logout":
        this.logout()
      break

      case "login":
      default:
        this.init()
      break
    }
  }

  get storage_data(){
    if(!ModelStorage.datas.system){return null}
    return ModelStorage.datas.system.find(e => e.id === this.name) || null
  }

  get auth(){
    return ModelBootstrap.elm_header.querySelector(`.auth`)
  }

  get login_icon_area(){
    return ModelBootstrap.elm_header.querySelector(`#login_icon`)
  }

  get is_auth(){
    return this.storage_data ? true : false
  }

  init(){
    if(this.is_auth){
      this.set_root_flg(true)
      this.icon_view()
    }
    else{
      this.set_root_flg(false)
      new Google({
        mode      : 'login',
        elm       : this.auth,
      }).promise.then(this.google_logined.bind(this))
    }
  }

  set_root_flg(flg = false){
    ModelBootstrap.root.setAttribute("data-logined" , flg)
  }

  icon_view(){
    const img = new Image()
    img.src = this.storage_data.picture
    this.login_icon_area.appendChild(img)
  }

  google_logined(){
    this.set_root_flg(true)
    Google.datas.id = this.name
    new ModelStorage({
      mode : "save",
      name : "system",
      data : Google.datas,
    })
    location.reload()
  }

  logout(){
    new ModelStorage({
      mode : "remove",
      name : "system",
      id   : this.name,
    })
    location.reload()
  }

}