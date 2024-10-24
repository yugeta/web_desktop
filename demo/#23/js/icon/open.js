import { Storage }   from "../lib/storage.js"
import { Bootstrap } from "../lib/bootstrap.js"

export class Open{
  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.run()
    })
  }

  run(){
    switch(this.options.mode){
      case "overlap":
        this.overlap()
      break
    }
  }

  overlap(){
    const current_data = Storage.datas.icons.find(e => e.id === this.options.id)
    const target_data  = Storage.datas.icons.find(e => e.id === this.options.target_id)
    if(!current_data || !target_data){return}
    switch(target_data.type){
      case "folder":
        this.folder_in(current_data, target_data)
      break

      case "trash":
        this.trash_in(current_data, target_data)
      break
      
    }
  }

  // ウィンドウが開いていない状態でフォルダアイコンのoverlapした処理
  folder_in(from_data, to_data){
    from_data.parent_id = to_data.id
    from_data.x = null
    from_data.y = null
    new Storage({
      mode : "save",
      name : "icons",
      data : from_data,
    })
    // windowが表示されている場合は更新する
    const current_icon = Bootstrap.elm_main.querySelector(`.icon[data-id="${from_data.id}"]`)
    const win = Bootstrap.elm_main.querySelector(`.window[data-id="${to_data.id}"] .body`)
    if(win){
      win.appendChild(current_icon)
    }
    else if(from_data.id !== to_data.id){
      current_icon.parentNode.removeChild(current_icon)
    }
  }

  is_system(from_data){
    return from_data.system_flg ? true : false
  }

  trash_in(from_data, to_data){
    // システムファイル（フォルダ）は、ゴミ箱に入れない
    if(this.is_system(from_data)){
      alert("systemデータは削除できません。")
      return
    }
    this.folder_in(from_data, to_data)
  }

  finish(){
    this.resolve()
  }
}