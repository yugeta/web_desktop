import { ModelBootstrap }   from "../../model/bootstrap.js"
import { ComponentSetting } from "../../component/setting.js"
import { ModelWindows }     from "../../model/windows.js"

export class ControllerWindowSort{
  constructor(active_window){
    this.active_window = active_window
    const windows = this.get_windows()
    if(!windows){return}
    this.replacement(windows)
  }

  get z(){
    return ComponentSetting.window.z
  }

  // 表示されているwindow一覧を取得
  get_windows(){
    const windows = Array.from(ModelBootstrap.elm_main.querySelectorAll(".window"))
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
    let z   = 0
    for(const elm of windows){
      if(elm === this.active_window){
        z = windows.length + this.z
        elm.style.setProperty("--z", windows.length + this.z, "")
      }
      else{
        z = num + 1 + this.z
        elm.style.setProperty("--z", num + 1 + this.z, "")
        num++
      }
      new ModelWindows({
        mode : "set_window",
        elm  : elm,
      })
    }
  }
}