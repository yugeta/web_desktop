import { ModelIcons }   from "../model/icons.js"
import { ModelWindows } from "../model/windows.js"

/**
 * desktop操作をした最終履歴を残し、ページへの再アクセス時に復旧するためのデータ保持処理
 */

export class ModelStorage{

  static datas = {
    icons   : ModelIcons.datas,
    windows : ModelWindows.datas,
  }

  name = "mynt_web_desktop"
  ext  = "webd"
  
  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      switch(this.options.mode){
        case "save":
          this.save(this.datas())
        break
  
        case "remove":
          this.remove(this.options)
        break
  
        case "load":
          this.datas = this.load(this.options.name)
        break
  
        case "del_all":
          this.del_all(this.options.data)
        break
  
        case "del_mode":
          this.del_mode(this.options.data)
        break
  
        case "del_id":
          this.del_id(this.options.data)
        break
  
        case "destroy":
          this.destroy()
        break
  
        case "download":
          this.download()
        break
  
        case "upload":
          this.upload()
        break
  
        case "init":
        default:
          this.init()
        break
      }
      this.finish()
    })
  }

  datas(){
    return {
      icons   : ModelIcons.datas,
      windows : ModelWindows.datas,
    }
  }

  get data(){
    if(!this.options.data || !this.options.data.mode){return null}
    const data = this.options.data || {}
    const storage = ModelStorage.datas
    if(storage && storage[data.mode] && storage[data.mode].constructor === Array){
      const index = storage[data.mode].findIndex(e => e.id === data.id)
      if(index !== -1){
        storage[data.mode][index] = data
      }
      else{
        storage[data.mode].push(data)
      }
    }
    else if(data.mode && storage[data.mode]){
      const data2 = Object.fromEntries(Object.entries(this.options.data).filter(([key]) => key !== 'mode'))  // 連想配列から"mode"keyを取り除く
      storage[data.mode] = [data2]
    }
    return storage
  }
  
  init(){
    const base64 = window.localStorage.getItem(this.name)
    if(!base64){return}
    const datas = this.dec(base64)
    if(datas.icons){
      for(const data of datas.icons){
        const index = ModelIcons.datas.findIndex(e => e.id === data.id)
        if(index >= 0){
          ModelIcons.datas[index] = data
        }
        else{
          ModelIcons.datas.push(data)
        }
      }
    }
    if(datas.windows){
      for(const data of datas.windows){
        const index = ModelWindows.datas.findIndex(e => e.id === data.id)
        if(index >= 0){
          ModelWindows.datas[index] = data
        }
        else{
          ModelWindows.datas.push(data)
        }
      }
    }
  }

  // localStorageに書き込み
  save(datas){//console.log(datas)
    const enc_datas = this.enc(datas)
    window.localStorage.setItem(this.name, enc_datas)
    return ModelStorage.datas
  }

  // localStorageから読み込み
  load(key){
    if(!key){
      return ModelStorage.datas
    }
    if(ModelStorage.datas[key]){
      return ModelStorage.datas[key] || []
    }
  }

  // 暗号化 : データ->JSON->エンコード（エスケープ）->base64
  enc(data){
    const json = JSON.stringify(data)
    const enc  = unescape(encodeURIComponent(json))
    return btoa(enc)
  }

  // 復号化 : base64->デコード（アンエスケープ）->JSON->データ
  dec(base64){
    if(!base64){return null}
    try{
      const dec  = escape(atob(base64))
      const json = decodeURIComponent(dec)
      return JSON.parse(json)
    }
    catch(err){
      console.warn(err)
      return {}
    }
  }

  // 任意項目のデータを削除する (mode)
  del_mode(data){
    if(!data || !data.mode){return}
    const storage_data = this.load()
    if(typeof storage_data[data.mode] === "undefined"){return}
    delete storage_data[data.mode]
    this.save(storage_data)
  }
  
  // 任意項目のデータを削除する (mode, id)
  del_id(data){
    if(!data || !data.mode || !data.id){return}
    const storage_data = ModelStorage.datas
    if(!storage_data[data.mode]){return}
    const index = storage_data[data.mode].findIndex(e => e.id === data.id)
    if(index === -1){return}
    storage_data[data.mode].splice(index,1)
    this.save(storage_data)
  }

  // 2階層目のデータを削除する
  remove(data){
    if(!data.id || !data.name || !ModelStorage.datas[data.name]){return}
    const index = ModelStorage.datas[data.name].findIndex(e => e.id)
    if(index < -1){return}
    ModelStorage.datas[data.name].splice(index,1)
    ModelStorage.datas[data.name] = ModelStorage.datas[data.name].filter(e => e)
    this.save(ModelStorage.datas)
  }

  // データを全て削除する
  del_all(){
    window.localStorage.removeItem(this.name)
  }
  destroy(){
    ModelStorage.datas = null
    window.localStorage.removeItem(this.name)
    location.reload()
  }

  finish(){
    this.resolve()
  }

  static has_icon_data(id){
    return ModelIcons.datas.find(e => e.id === id) ? true : false
  }

  download(){
    const json = JSON.stringify(ModelStorage.datas, null , "  ")
    const data = this.enc(json)
    const bom = new Uint8Array([0xef, 0xbb, 0xbf])
    const blob = new Blob([bom, data], { type: "text/plane" })
    const a = document.createElement("a")
    a.href = (window.URL || window.webkitURL).createObjectURL(blob)
    a.download = `web_desktop_${(+new Date())}.${this.ext}`
    a.hidden = true
    document.body.appendChild(a)
    a.click()
    a.parentNode.removeChild(a)
  }

  upload(){
    // アップロードモジュールを作成
    const file = document.createElement("input")
    file.id = `web_desktop_upload_file_${(+new Date())}`
    file.type = "file"
    file.hidden = true
    file.accept = `.${this.ext}`
    file.onchange = this.upload_file_loaded.bind(this,file.id)
    document.body.appendChild(file)
    file.click()
  }
  upload_file_loaded(id, e){
    const file = document.getElementById(id)
    if(!file){return}
    const reader = new FileReader()
    reader.readAsText(file.files[0])
    reader.onload = ((e)=>{
      const json = this.dec(e.target.result)
      const data = JSON.parse(json)
      this.save(data)
      location.reload()
    }).bind(this)
    // アップロードモジュールを削除
    if(file){
      file.parentNode.removeChild(file)
    }
  }

}