import { Bootstrap }  from "../../controller/lib/bootstrap.js"
import { Setting }    from "../../model/component/setting.js"

export class Sort{
  constructor(active_window){
    this.active_window = active_window
    const windows = this.get_windows()
    if(!windows){return}
    this.replacement(windows)
  }

  get z(){
    return Setting.window.z
  }

  // 表示されているwindow一覧を取得
  get_windows(){
    const windows = Array.from(Bootstrap.elm_main.querySelectorAll(".window"))
    if(windows){
      windows.sort((a,b)=>{
        if(Number(a.style.getPropertyValue("--z") || 0) < Number(b.style.getPropertyValue("--z") || 0)){return -1}
        if(Number(a.style.getPropertyValue("--z") || 0) > Number(b.style.getPropertyValue("--z") || 0)){return +1}
        return 0
      })
    }
    return windows
  }

  replacement(windows){
    let num = 0
    for(const elm of windows){
      if(elm === this.active_window){
        elm.style.setProperty("--z", windows.length + this.z, "")
      }
      else{
        elm.style.setProperty("--z", num + 1 + this.z, "")
        num++
      }
    }
  }
}