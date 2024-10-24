import { Bootstrap } from "../lib/bootstrap.js"
import { Storage }   from "../lib/storage.js"
import { Google }    from "../system/google.js"

/**
 * ログイン処理
 */

export class Auth{
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
    if(!Storage.datas.system){return null}
    return Storage.datas.system.find(e => e.id === this.name) || null
  }

  get auth(){
    return Bootstrap.elm_header.querySelector(`.auth`)
  }

  get login_icon_area(){
    return Bootstrap.elm_header.querySelector(`#login_icon`)
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
    Bootstrap.root.setAttribute("data-logined" , flg)
  }

  icon_view(){
    const img = new Image()
    img.src = this.storage_data.picture
    this.login_icon_area.appendChild(img)
  }

  google_logined(){
    this.set_root_flg(true)
    Google.datas.id = this.name
    new Storage({
      mode : "save",
      name : "system",
      data : Google.datas,
    })
    location.reload()
  }

  logout(){
    new Storage({
      mode : "remove",
      name : "system",
      id   : this.name,
    })
    location.reload()
  }

}