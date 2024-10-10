import { Window }      from "../window.js"

export class DoubleClick{
  constructor(e){
    this.event(e.target)
  }

  event(target){
    // ダブルクリックしたエレメントの取得
    const icon = target.closest(".icon")

    // アイコンをダブルクリッククリック
    if(icon){
      const name = icon.querySelector(".name").textContent
      new Window({
        mode : "view",
        name : name,
      })
    }
  }
}