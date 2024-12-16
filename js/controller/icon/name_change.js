import { ModelStorage }   from "../../model/storage.js"
import { ModelIcons }     from "../../model/icons.js"
import { ModelBootstrap } from "../../model/bootstrap.js"

/**
 * アイコンの名前を変更する処理
 */

export class ControllerIconNameChange{
  constructor(options){
    this.options = options || {}
    ControllerIconNameChange.icon = this.icon
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      switch(options.mode){
        case "end":
          const elm = ModelBootstrap.elm_main.querySelector(`.icon .name[contenteditable]`)
          this.decision_name(elm)
        break

        default:
          // システムアイテムの場合は名前変更できない
          if(this.is_system_item){
            alert("システムデータの名前変更はできません。")
          }
          else{
            this.set_input()
            this.set_event()
            this.text_select()
          }
      }
    })
  }

  get icon(){
    return this.options.target
  }

  get id(){
    return this.icon.getAttribute("data-id")
  }

  get elm_name(){
    return this.icon.querySelector(".name")
  }

  get is_system_item(){
    return this.icon_data.system_flg ? true : false
  }

  get icon_data(){
    return ModelIcons.datas.find(e => e.id === this.id)
  }

  // 名前欄を入力可能にする
  set_input(){
    this.icon.setAttribute("data-status", "pause")
    this.elm_name.setAttribute("contenteditable", true)
    this.elm_name.focus()
  }

  // 文字を全選択
  text_select(){
    const selection = window.getSelection()
    const range = document.createRange()
    const offset = this.elm_name.innerText.length
    range.setStart(this.elm_name.firstChild, 0)
    range.setEnd(this.elm_name.firstChild, offset)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  // 名前欄に一度だけイベントセットする
  set_event(){
    if(this.elm_name.event_setted){return}
    this.elm_name.addEventListener("keydown", this.keydown.bind(this))
    this.elm_name.event_setted = true
  }

  // enterキーを押したら名前を決定する
  keydown(e){
    if(e.keyCode === 13
    || e.key === "enter"){
      e.preventDefault()
      this.decision_name(e.target)
    }
  }

  // 決定した名前の事後処理
  decision_name(elm_name){
    if(!elm_name){return}
    const icon = elm_name.closest(".icon")
    const id   = icon.getAttribute("data-id")
    const name = elm_name.innerText
    this.icon_data.name = name
    new ModelStorage({
      mode : "save",
      // name : "icons",
      // data : this.icon_data,
    })
    elm_name.blur()
    elm_name.removeAttribute("contenteditable")
  }

  set_storage(){

  }

  finish(){
    this.resolve()
  }
}