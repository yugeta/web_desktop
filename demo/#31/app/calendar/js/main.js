import { Setting } from "./setting.js"
// import { LoadApi } from "./load_api.js"

export class Main{
  static datas = []

  constructor(options){
    this.promise = new Promise((resolve,reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.options = options || {}
      if(!this.root){return}
      this.setting()
      // this.load_api()
    })
  }

  get root(){
    return this.options.root || document.querySelector(`.window[data-id="calendar"] .body table.lists`)
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

  // load_api(){
  //   new LoadApi({
  //     root : this.root
  //   })
  // }

  load(){
    // const xhr = new XMLHttpRequest()
    // xhr.withCredentials = true
    // xhr.open('POST' , Setting.datas.url , true)
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    // xhr.onload = this.loaded.bind(this)
    // xhr.send()
// console.log(Setting.datas.url)
    // fetch(Setting.datas.url)
    fetch(Setting.datas.url, {
      method: 'GET',
      headers : {
        // 'Accept' : 'application/json',
        'Content-Type' : 'application/x-www-form-urlencoded',
      }
    })
    
    .then(e=>{return e.json()})
    .then(this.loaded.bind(this))

    // .then(e => {console.log(e)})
  }

  loaded(datas){
    console.log(datas)
    // this.view(datas)
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