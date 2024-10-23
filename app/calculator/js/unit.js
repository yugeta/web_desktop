import { Common } from "./common.js"
import { Calc }   from "./calc.js"
import { Num }    from "./num.js"

/**
 * 演算記号を押した時に、表示されている数値を一旦メモリ化する処理
 * 次に入力する時は数値がリセットされて入力される。
 * 【格納される変数】
 * - Unit.num
 * =（イコール）を押した場合は、メモリを消して結果表示
 */

export class Unit{
  static num  = null
  static unit = null

  constructor(unit){
    this.unit = unit
    if(!this.check()){return}

    const num = this.calc()

    switch(unit){
      case "=":
        this.view(num)
        Unit.num  = null
        Unit.unit = null
      break

      default:
        Num.input_flg = false
        Unit.num  = num || null
        Unit.unit = unit
      break
    }
  }

  // 数値が入力されていない場合は何もしない
  check(){
    return !this.unit || !Common.elm_result.textContent ? false : true
  }

  // メモリされている数値と入力値の合計処理
  calc(){
    const current_num = Number(Common.current_str) || 0

    // メモリ値が内場合の処理
    if(Unit.num === null){
      return current_num
    }

    // メモリ値がある場合の処理（計算処理）
    else{
      const memory_num  = Unit.num || 0
      const calc        = new Calc(memory_num, current_num, Unit.unit)
      return calc.num
    }
  }

  // 表示処理
  view(num){
    Common.elm_result.textContent = num
  }

}