import { ModelBootstrap } from "../../model/bootstrap.js"

/**
 * ゴミ箱のModelモジュール
 * 左下に配置
 */

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
      x : 0,
      // x : ModelBootstrap.elm_main.offsetWidth  - this.size.w,
      y : ModelBootstrap.elm_main.offsetHeight - this.size.h,
    }
  }


  finish(){
    this.resolve()
  }
}