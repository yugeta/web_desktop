import { Event } from "./event.js"
import { Asset } from "./asset.js"

class Main{
  window_default = {
    pos : {
      x: 80, 
      y: 20,
    },
    gap : {
      x: 30, 
      y: 40,
    },
    size : {
      w : 300,
      h : 200,
    },
    z : 1000
  }

  constructor(){
    new Asset().promise.then(()=>{console.log(Asset.datas)})
    new Event()
  }
}


switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
  break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}