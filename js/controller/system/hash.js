import { Window }    from "../../controller/window.js"
import { Bootstrap } from "../../controller/lib/bootstrap.js"
import { Storage }   from "../../controller/lib/storage.js"

export class Hash{
  constructor(options){//console.log(options,this.hash_name)
    this.options = options || {}
    switch(this.options.mode){
      case "window_close":
        this.window_close()
      break

      default:
        this.init()
    }
  }

  get hash_name(){
    if(!location.hash){return}
    return location.hash.replace(/^#/,"")
  }

  // iconデータが存在確認（存在しないidの場合は、hashを削除する）
  get is_data(){
    if(!Storage.datas ||!Storage.datas.icons){return}
    return Storage.datas.icons.find(e => e.id === this.hash_name) ? true : false
  }


  init(){
    window.addEventListener('hashchange'  , this.change.bind(this))
    if(location.hash){
      this.change()
    }
  }

  change(){
    if(!location.hash){return}
    if(this.is_data){
      this.window_view()
    }
    else{
      this.clear()
    }
  }

  window_view(){
    new Window({
      mode : "view",
      id   : this.hash_name,
    })
  }

  window_close(){
    if(!location.hash
    || !this.options.id
    || location.hash !== `#${this.options.id}`){return}
    const elm_window = Bootstrap.elm_main.querySelector(`.window[data-id="${this.options.id}"]`)
    if(!elm_window){return}
    this.clear()
  }

  clear(){
    const new_url = location.href.split("#")[0]
    history.pushState({} , null , new_url)
  }
}