

export class Asset{
  lists = [
    {
      name : "window",
      file : "window.html",
    },
    {
      name : "icon",
      file : "icon.html",
    },
  ]

  constructor(){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load()
    })
  }

  base_path = "asset"

  load(){
    const data = this.lists.shift()
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open('GET' , `${this.base_path}/${data.file}` , true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = this.loaded.bind(this, data)
    xhr.send()
  }

  loaded(data, e){
    data.text = e.target.response
    Asset.datas.push(data)
    if(this.lists.length){
      this.load()
    }
    else{
      this.finish()
    }
  }


  finish(){
    this.resolve()
  }

  /**
   * Static
   */
  static datas = []

  static get_data(name){
    return Asset.datas.find(e => e.name === name)
  }

}