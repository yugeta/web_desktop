/**
 * 基礎データの読み込み処理
 * # rule
 * - nameはデータ呼び出しの時に必要な為、ユニーク状態にしてください。
 */

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
    {
      name : "setting",
      file : "setting.json"
    },
    {
      name : "context_menu_item",
      file : "context_menu_item.html"
    },
    {
      name : "background_modal",
      file : "background_modal.html"
    }
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
    data.ext  = this.get_extension(data.file)
    switch(data.ext){
      case "json":
        data.data = JSON.parse(data.text)
      break
    }
    
    Asset.datas.push(data)
    if(this.lists.length){
      this.load()
    }
    else{
      this.finish()
    }
  }

  // ファイル名から拡張子の取得
  get_extension(file){
    const sp1 = file.split("?")
    const sp2 = sp1[0].split(".")
    return sp2.pop()
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