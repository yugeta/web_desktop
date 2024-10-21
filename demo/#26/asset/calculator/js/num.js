import { Common } from "./common.js"

/**
 * 数字キー + .（ドット）キーを押した時に画面に表示する処理
 */

export class Num{
  static input_flg = false

  constructor(str){
    if(!str){return}
    if(!this.is_safe(str)){return}
    if(!Num.input_flg){
      Common.elm_result.textContent = ""
    }
    this.set_str(str)
    Num.input_flg = true
  }

  // .(ドット)が２つ以上になる場合は入力しない
  is_safe(str){
    return str === "." && Common.current_str.indexOf(".") !== -1 ? false : true
  }

  set_str(str){
    Common.elm_result.textContent += str
  }
}