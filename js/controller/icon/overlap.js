import { Bootstrap } from "../../controller/lib/bootstrap.js"
import { Open }      from "../../controller/icon/open.js"

export class Overlap{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "end":
        this.open()
        this.end()
      break

      default:
        this.exec_icon()
        this.exec_window()
    }
  }

  get elm(){
    return this.options.elm
  }

  get event(){
    return this.options.event
  }

  get overlap_icon(){
    const current_id = this.elm.getAttribute("data-id")
    const target = this.event.target
    const icon   = target.closest(".icon")
    const data   = {
      id     : null,
      target : null,
      status : null,
    }
    if(icon){
      data.id     = icon.getAttribute("data-id")
      data.target = icon
      data.status = ""
    }
    if(data.id === current_id){
      data.status = "prohibited" // 禁止
    }
    return data
  }

  get overlap_window(){
    const current_id = this.elm.getAttribute("data-id")
    const target = this.event.target
    const win    = target.closest(".window")
    const data   = {
      id     : null,
      target : null,
      status : null,
    }
    if(win){
      data.id     = win.getAttribute("data-id")
      data.target = win
      data.status = win.getAttribute("data-type") === "folder" || win.getAttribute("data-type") === "trash" ? "" : "prohibited"
    }
    if(data.id === current_id){
      data.status = "prohibited" // 禁止
    }
    return data
  }

  // アイコンの重なり処理
  exec_icon(){
    const data = this.overlap_icon
    
    // 別アイコン
    if(data.target
    && !data.target.hasAttribute("data-overlap")){
      data.target.setAttribute("data-overlap" , data.status)
    }

    if(data.id && Overlap.icon
    && Overlap.icon.id !== data.id){
      Overlap.icon.target.removeAttribute("data-overlap")
    }

    if(!data.target){
      this.end("icon")
    }

    Overlap.icon     = data.target ? data : null
    Overlap.past_id  = data.status === "prohibited" ? null : data.id
  }

  // ウィンドウの重なり処理
  exec_window(){
    const data = this.overlap_window
    if(data.target && !data.target.hasAttribute("data-overlap")){
      data.target.setAttribute("data-overlap" , data.status)
    }

    if(data.id && Overlap.window
    && Overlap.window.id !== data.id){
      Overlap.window.target.removeAttribute("data-overlap")
    }

    if(!data.target){
      this.end("window")
    }

    Overlap.window = data.target ? data : null
  }

  end(type){
    type = type ? `.${type}` : ""
    const elms = Bootstrap.elm_main.querySelectorAll(`${type}[data-overlap]`)
    for(const elm of elms){
      elm.removeAttribute("data-overlap")
    }
    Overlap.icon    = null
    Overlap.window  = null
  }

  open(){
    if(!Overlap.past_id){return}
    new Open({
      mode      : "overlap",
      id        : this.elm.getAttribute("data-id"),
      target_id : Overlap.past_id,
    })
    Overlap.past_id  = null
  }
}