import { ControllerWindow } from "../controller/window.js"
import { ModelWindows }     from "../model/windows.js"
import { ModelStorage }     from "../model/storage.js"

export class EventDoubleClick{
  constructor(e){
    this.event(e.target)
  }

  event(target){
    // ダブルクリックしたエレメントの取得
    const icon = target.closest(".icon")
    // アイコンをダブルクリッククリック
    if(icon){
      const id   = icon.getAttribute("data-id")
      const name = icon.querySelector(".name").textContent
      new ControllerWindow({
        mode : "view",
        id   : id,
        name : name,
      })
      new ModelWindows({
        mode : "set_window",
        id   : id,
      })
      new ModelStorage({
        mode  : "save",
      })
    }
  }
}