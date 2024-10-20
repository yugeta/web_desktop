
/**
 * desktop操作をした最終履歴を残し、ページへの再アクセス時に復旧するためのデータ保持処理
 */

export class Storage{
  name = "mynt_web_desktop_12"

  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.fork()
      this.finish()
    })
  }

  fork(){
    switch(this.options.mode){
      case "save":
        this.save(this.data)
      break

      case "load":
        this.datas = this.load()
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
    }
  }

  get data(){
    if(!this.options.data || !this.options.data.mode){return null}
    const data = this.options.data || {}
    const storage = this.load() || {}
    if(storage && storage[data.mode] && storage[data.mode].constructor === Array){
      const index = storage[data.mode].findIndex(e => e.id === data.id)
      if(index !== -1){
        storage[data.mode][index] = data
      }
      else{
        storage[data.mode].push(data)
      }
      console.log(storage)
    }
    else{
      const data2 = Object.fromEntries(Object.entries(this.options.data).filter(([key]) => key !== 'mode'))  // 連想配列から"mode"keyを取り除く
      storage[data.mode] = [data2]
    }
    return storage
  }

  // localStorageに書き込み
  save(data){
    const enc_data = this.enc(data)
    return window.localStorage.setItem(this.name, enc_data)
  }

  // localStorageから読み込み
  load(){
    const base64 = window.localStorage.getItem(this.name)
    return base64 ? this.dec(base64) : null
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

  // データを全て削除する
  del_all(){
    window.localStorage.removeItem(this.name)
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
    const storage_data = this.load()
    if(typeof storage_data[data.mode] === "undefined"
    || typeof storage_data[data.mode][data.id] === "undefined"){return}
    delete storage_data[data.mode][data.id]
  }

  finish(){
    this.resolve()
  }
}