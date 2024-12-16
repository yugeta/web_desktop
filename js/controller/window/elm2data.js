/**
 * Windowのelementから、storageセーブデータを生成する
 * id : string, // 対象のicon-idと同じ
 * name : string,
 * x : number,
 * y : number,
 * w : number,
 * h : number,
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
      type      : this.type,
      x : this.x, y : this.y,
      w : this.w, h : this.h,
      z         : this.z,
    }
  }

  get id(){
    return this.elm.getAttribute("data-id")
  }

  get x(){
    return Number(this.elm.style.getPropertyValue("--x").replace("px","") || 0)
  }

  get y(){
    return Number(this.elm.style.getPropertyValue("--y").replace("px","") || 0)
  }

  get w(){
    return Number(this.elm.style.getPropertyValue("--w").replace("px","") || 0)
  }

  get h(){
    return Number(this.elm.style.getPropertyValue("--h").replace("px","") || 0)
  }

  get z(){
    return Number(this.elm.style.getPropertyValue("--z") || 1)
  }

  get type(){
    return "window"
  }

}