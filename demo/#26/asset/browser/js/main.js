/**
 * 基本モジュール
 * 初期設定
 */

import { Address } from "./address.js"

class Main{
  constructor(){
    new Address()
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