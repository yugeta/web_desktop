import { ModelStorage } from "../../model/storage.js"

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
    this.datas = ModelStorage.datas.icons.find(e => e.id === this.id)
  }

  get id(){
    return this.elm.getAttribute("data-id")
  }
}