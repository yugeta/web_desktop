/**
 * ゴミ箱のModelモジュール
 */

import { Bootstrap } from "../lib/bootstrap.js"

export class Trash{
  constructor(options){
    this.options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
    })
  }

  get size(){
    return {
      w : 50 + 20,
      h : 76,
    }
  }

  get data(){
    return this.options
  }

  // 定位置
  get fixed_position(){
    return {
      x : Bootstrap.elm_main.offsetWidth  - this.size.w,
      y : Bootstrap.elm_main.offsetHeight - this.size.h,
    }
  }


  finish(){
    this.resolve()
  }
}