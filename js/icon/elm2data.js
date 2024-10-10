import { Storage } from "../lib/storage.js"

/**
 * アイコンのelementから、storageセーブデータを生成する
 * id : string,
 * name : string,
 * file : img/icon/ ...,
 * x : number,
 * y : number,
 * type: "icon"
 */

export class Elm2data{
  datas = {}
  
  constructor(elm){
    this.elm = elm
    this.set_datas()
  }

  set_datas(){
    this.datas = {
      id        : this.id,
      file      : this.file,
      name      : this.name,
      type      : this.type,
      x         : this.x,
      y         : this.y,
      parent_id : this.parent_id,
    }
  }

  get id(){
    return this.elm.getAttribute("data-id")
  }

  get file(){
    return this.elm.querySelector("img").getAttribute("src").replace(/^img\/icon\//, "")
  }

  get name(){
    return this.elm.querySelector(".name").textContent
  }

  get x(){
    return Number(this.elm.style.getPropertyValue("--x").replace("px","") || 0)
  }

  get y(){
    return Number(this.elm.style.getPropertyValue("--y").replace("px","") || 0)
  }

  get type(){
    return "icon"
  }

  get parent_id(){
    if(!Storage.datas || !Storage.datas.icons){return ""}
    const storage_data =  Storage.datas.icons.find(e => e.id === this.id)
    return storage_data ? storage_data.parent_id : ""
  }
}