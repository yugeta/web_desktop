import { Bootstrap } from "../../controller/lib/bootstrap.js"
import { Convert }   from "../../controller/lib/convert.js"
import { Storage }   from "../../controller/lib/storage.js"
import { Clear }     from "../../controller/icon/clear.js"
import { Overlap }   from "../../controller/icon/overlap.js"
import { Icon }      from "../../controller/icon.js"
// import { Icons }     from "../../component/icons.js"
import { Icons }     from "../../model/icons.js"
import { Html }      from "../../component/html.js"

export class Move{
  constructor(options){
    this.options = options || {}
    this.elm = options.target

    switch(options.mode){
      case "move_start":
        this.move_start()
        this.create_instance()
      break

      case "move_end":
        if(!this.window_in_prohibited_acts(this.options.window || Bootstrap.elm_main)
        && !Overlap.past_id){
          this.window_change()
          this.moved()
        }
        setTimeout(this.move_end.bind(this), 0)
        this.remove_instance()
        new Overlap({
          mode : "end",
          elm  : this.elm,
        })
      break

      case "move":
      default:
        this.move_instance()
        new Overlap({
          elm   : this.elm,
          event : this.options.event,
        })
      break
    }
  }

  get icon_id(){
    return this.elm.getAttribute("data-id")
  }

  get icon_data(){
    // const icon_datas = new Storage({mode: "load", name:"icons"}).datas
    // if(!icon_datas || !icon_datas.length){return null}
    // return icon_datas.find(e => e.id === this.icon_id)
    return Icons.datas.find(e => e.id === this.icon_id)
  }

  move_start(){
    this.elm.setAttribute("data-status", "move")
  }

  move_end(){
    this.elm.removeAttribute("data-status")
  }

  moved(){
    const pos = this.moved_pos()
    this.elm.style.setProperty("--x" , `${pos.x}px`)
    this.elm.style.setProperty("--y" , `${pos.y}px`)

    this.elm.setAttribute("data-move", true)
  }

  moved_pos(){
    // desktop on icon
    if(this.options.target.parentNode === Bootstrap.elm_main){
      return {
        x : this.options.point.x - this.options.diff.x - Bootstrap.window_rect.left,
        y : this.options.point.y - this.options.diff.y - Bootstrap.window_rect.top,
      }
    }

    // window inner icon
    else{
      const window_body = this.options.target.closest(".window .body")
      const window_rect = window_body.getBoundingClientRect()
      return {
        x : this.options.point.x - this.options.diff.x - window_rect.left,
        y : this.options.point.y - this.options.diff.y - window_rect.top,
      }
    }
  }

  create_instance(){
    Move.instance = document.createElement("div")
    Move.instance.className = "icon-move-instance"
    Move.instance.setAttribute("data-select", true)
    const icon = new Icon(this.icon_data)
    const html = new Convert(Html.icon, icon).text
    Move.instance.innerHTML = html
    Bootstrap.elm_main.appendChild(Move.instance)
    const x = this.options.point.x - this.options.diff.x - Bootstrap.window_rect.left
    const y = this.options.point.y - this.options.diff.y - Bootstrap.window_rect.top
    Move.instance.style.setProperty("left",`${x}px`,"")
    Move.instance.style.setProperty("top" ,`${y}px`,"")
  }

  move_instance(){
    if(!Move.instance){return}
    const x = this.options.point.x - this.options.diff.x - Bootstrap.window_rect.left
    const y = this.options.point.y - this.options.diff.y - Bootstrap.window_rect.top
    Move.instance.style.setProperty("left",`${x}px`,"")
    Move.instance.style.setProperty("top" ,`${y}px`,"")
  }

  remove_instance(){
    if(!Move.instance){return}
    Move.instance.parentNode.removeChild(Move.instance)
    Move.instance = null
  }

  window_change(){
    if(this.options.first_window === this.options.window){return}
    const parent = this.options.window ? this.options.window.querySelector(".body") : Bootstrap.elm_main
    parent.appendChild(this.elm)
    this.moved_pos()
    this.storage_parent_change(parent)
  }

  storage_parent_change(parent_elm){
    const icon_data = this.icon_data

    // desktop
    if(parent_elm === Bootstrap.elm_main){
      icon_data.parent_id = ""
      new Clear(Bootstrap.elm_main, this.elm)
    }

    // window
    else{
      icon_data.parent_id = parent_elm.closest(".window").getAttribute("data-id")
      new Clear(parent_elm, this.elm)
    }
  }
  
  // 禁止事項（アイコンをウィンドウに入れる時に、自分（フォルダアイコン）または、folder以外の中に入れることはできない）
  // @return { true : 禁止 , false : スルー }
  window_in_prohibited_acts(parent){
    // windowの場合は問題なし
    if(parent === Bootstrap.elm_main){
      return false
    }

    const parent_id = parent ? parent.getAttribute("data-id") : null
    const first_id  = this.options.first_window ? this.options.first_window.getAttribute("data-id") : null

    // 現在と同じ場合は、そのまま
    if(parent_id === first_id){
      return false
    }

    // フォルダ以外は移動無し
    if(["folder","trash"].indexOf(parent.getAttribute("data-type")) === -1){
      return true
    }

    // 同じIDのwindowには移動できない
    if(this.icon_id === parent_id){
      return true
    }

    // 上位階層に同じIDがある場合も移動できない
    if(this.get_parent_id_array(parent_id).indexOf(this.icon_id) !== -1){
      return true
    }

    // 問題なし
    return false
  }

  // windowの上位階層のidをrootまで調べる
  get_parent_id_array(parent_id){
    const datas = []
    let id = parent_id
    while(id !== null){
      const storage_data = Icons.datas.find(e => e.id === id)
      if(storage_data && storage_data.parent_id){
        datas.push(storage_data.parent_id)
        id = storage_data.parent_id
      }
      else{
        id = null
      }
      if(id === parent_id){break}
    }
    return datas
  }
}