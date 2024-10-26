import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Style }     from "../lib/style.js"
import { Storage }   from "../lib/storage.js"
import { Window }    from "../window.js"

export class Background{
  static window_name = "background_modal"
  static sheets = null

  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view_modal":
        this.window_view()
        this.set_body()
        this.first_select()
        this.set_event()
      break

      default:
        Background.sheets = Background.sheets || new Style()
        this.set_bg(this.value)
    }
  }

  get root(){
    return Bootstrap.elm_main.querySelector(`.window[data-id="${Background.window_name}"]`)
  }

  get body(){
    return this.root.querySelector(".body")
  }

  get name(){
    return "壁紙の設定"
  }

  window_view(){
    new Window({
      mode : "view",
      id   : Background.window_name,
      name : this.name,
      window_size : {
        width  : 500,
        height : 500,
      }
    })
  }

  set_body(){
    const data = {}
    this.body.innerHTML = new Convert(Asset.get_data("background_modal").text,data).text
  }

  first_select(){console.log(this.value)
    const target_input = this.root.querySelector(`input[value="${this.value}"]`)
    if(!target_input){return}
    target_input.checked = true
  }

  set_event(){
    const area = this.root.querySelector("button")
    if(this.root){
      this.root.addEventListener("click" , this.click.bind(this))
    }
  }

  click(e){
    if(e.target.nodeName === "INPUT"){return}
    const li = e.target.closest("li")
    if(!li){return}
    const input = li.querySelector(`input[name="background"]`)
    const value = input.getAttribute("value")
    this.set_bg(value)
    document.querySelector(`#desktop main`).style.setProperty("background", value , "") // GoogleChromeの為の特殊処理
    Storage.datas.background = value
    new Storage({mode : "save"})
  }

  get value(){
    return this.storage_data || this.setting_data
  }

  get storage_data(){
    return Storage.datas.background || null
  }

  get setting_data(){
    const setting_data = Asset.get_data("setting")
    if(!setting_data || !setting_data.data){return}
    return Asset.get_data("setting").data.background
  }

  // 初期の背景をセット
  set_bg(value){
    if(!value){return}
    Background.sheets.set_value("#desktop main", "background", value, null)
  }

}

