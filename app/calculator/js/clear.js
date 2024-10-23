import { Common } from "./common.js"
import { Unit }   from "./unit.js"

/**
 * 表示している数値を消す処理
 * - メモリもクリアする
 */

export class Clear{
  constructor(){
    Common.elm_result.textContent = ""
    Unit.num  = null
    Unit.unit = null
  }
}