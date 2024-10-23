import { Common } from "./common.js"

/**
 * 表示されている数値のプラスとマイナスを入れ替える
 */

export class Percent{
  constructor(){
    if(!this.result_str){return}
    Common.elm_result.textContent = Number(this.result_str) /100
  }

  get result_str(){
    return Common.elm_result.textContent
  }
}