import { Window }      from "../../controller/window.js"
import { Windows }     from "../../model/windows.js"
import { Storage }     from "../../controller/lib/storage.js"

export class DoubleClick{
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
      new Window({
        mode : "view",
        id   : id,
        name : name,
      })
      new Windows({
        mode : "set_window",
        id   : id,
      })
      new Storage({
        mode  : "save",
      })
    }
  }
}