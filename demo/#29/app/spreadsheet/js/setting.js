

export class Setting{
  static datas = {}

  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load()
    })
  }

  get dir(){
    return import.meta.url.split("/").slice(0,-1).join("/")
  }

  load(){
    const xhr = new XMLHttpRequest()
    xhr.open('GET' , `${this.dir}/../setting.json` , true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = this.loaded.bind(this)
    xhr.send()
  }

  loaded(e){
    Setting.datas = JSON.parse(e.target.response)
    this.finish()
  }

  finish(){
    this.resolve()
  }
}