import { Num }       from "./num.js"
import { Unit }      from "./unit.js"
import { Clear }     from "./clear.js"
import { PlusMinus } from "./plus_minus.js"
import { Percent }   from "./percent.js"

/**
 * 基本モジュール
 * 初期設定
 */

class Main{
  constructor(){
    this.set_event()
  }
  get elm_result(){
    return document.querySelector(`.calculator .result`)
  }

  set_event(){
    document.querySelector(".calculator").addEventListener("click" , this.click.bind(this))
  }

  click(e){
    const li = e.target.closest(`li`)
    if(!li){return}
    switch(li.getAttribute("class")){
      case "point":
      case "num":
        new Num(e.target.textContent)
      break

      case "unit":
        new Unit(e.target.getAttribute("data-unit"))
      break

      case "equal":
        new Unit("=")
      break

      case "plus-minus":
        new PlusMinus()
      break

      case "percent":
        new Percent()
      break

      case "clear":
        new Clear()
      break
    }
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
  break

  default:
    window.addEventListener("DOMContentLoaded" , (()=>new Main()))
}