import { Setting }  from "./setting.js"
import { View }     from "./view.js"
import { Event }    from "./event.js"

export class Main{
  static datas = []

  constructor(options){
    this.promise = new Promise((resolve,reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.options = options || {}
      if(!this.root){return}
      this.setting()
    })
  }

  get root(){
    return this.options.root || document.querySelector(`.window[data-id="calendar"] .body`)
  }

  get table(){
    return this.root.querySelector("table.lists")
  }

  get datas(){
    if(!Setting.datas.domains && !Setting.datas.domains.length && Setting.datas.domain){
      Setting.datas.domains = [Setting.datas]
    }
    return Setting.datas
  }

  setting(){
    new Setting().promise.then(this.setting_loaded.bind(this))
      
  }

  setting_loaded(){
    const options = {
      root  : this.root,
      table : this.table,
    }
    new View(options)
    new Event(options)
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