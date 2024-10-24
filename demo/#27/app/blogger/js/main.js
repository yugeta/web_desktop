import { Asset }   from "./asset.js"
import { Setting } from "./setting.js"
import { Blogger } from "./blogger.js"
import { Convert } from "./convert.js"

export class Main{
  static datas = []
  blogger_loaded_count = 0

  constructor(options){
    this.promise = new Promise((resolve,reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.options = options || {}
      if(!this.root){return}
      this.asset()
    })
  }

  get root(){
    return this.options.root || document.querySelector(`.window[data-id="blogger"] .body ul.lists`)
  }

  get datas(){
    if(!Setting.datas.domains && !Setting.datas.domains.length && Setting.datas.domain){
      Setting.datas.domains = [Setting.datas]
    }
    return Setting.datas
  }

  get max_results(){
    return Setting.datas.max_results || 20
  }

  asset(){
    new Asset().promise.then(()=>{
      this.setting()
    })
  }

  setting(){
    new Setting().promise.then(()=>{
      this.load()
    })
  }

  load(){
    for(const data of this.datas.domains){
      this.blogger(data)
    }
  }

  blogger(data){
    new Blogger({
      domain      : data.domain,
      type        : "posts",
      max_results : this.max_results,
      label       : data.label || [],
    }).promise.then(this.acquisition.bind(this))
  }

  // 取得後
  acquisition(datas){
    if(!datas || !this.root){return}
    this.blogger_loaded_count++
    Main.datas = [...Main.datas, ...datas]
    if(this.datas.domains.length > this.blogger_loaded_count){return}
    const datas2 = this.data_marge(Main.datas)
    this.view(datas2)
    this.finish()
  }

  data_marge(datas){
    datas.sort((a,b) => {
      if(`${a.date} ${a.time}` < `${b.date} ${b.time}`){return +1}
      if(`${a.date} ${a.time}` > `${b.date} ${b.time}`){return -1}
      return 0
    })
    return datas
  }

  // 表示
  view(datas){
    let num = 0
    for(const data of datas){
      if(this.max_results < num){break}
      data.labels = this.convert_labels(data.label)
      const html = new Convert(Asset.datas, data).text
      this.root.insertAdjacentHTML("beforeend", html)
      num++
    }
  }

  convert_labels(label_array){
    if(!label_array || !label_array.length){return ""}
    let html = ""
    for(const label of label_array){
      html += `<li>${label}</li>`
    }
    return html
  }

  finish(){
    this.resolve()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main();break
  default:
    window.addEventListener("DOMContentLoaded" , (()=>new Main()))
}