import { Setting } from "./setting.js"

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
    return this.options.root || document.querySelector(`.window[data-id="spreadsheet"] .body table.lists`)
  }

  get datas(){
    if(!Setting.datas.domains && !Setting.datas.domains.length && Setting.datas.domain){
      Setting.datas.domains = [Setting.datas]
    }
    return Setting.datas
  }

  setting(){
    new Setting().promise.then(this.load.bind(this))
  }

  load(){
    // const xhr = new XMLHttpRequest()
    // xhr.withCredentials = true
    // xhr.open('POST' , Setting.datas.url , true)
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // xhr.onload = this.loaded.bind(this)
    // xhr.send()

    fetch(Setting.datas.url)
    .then(e=>{return e.json()})
    .then(this.loaded.bind(this))

  }

  loaded(datas){
    console.log(datas)
    this.view(datas)
  }

  // 表示
  view(datas){
    for(const data of datas){
      const cols = data.map(e => `<td>${e}</td>`).join("")
      this.root.insertAdjacentHTML("beforeend", `<tr>${cols}</tr>`)
    }
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