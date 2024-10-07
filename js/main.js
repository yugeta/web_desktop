import { Event }   from "./lib/event.js"
import { Asset }   from "./lib/asset.js"
import { Desktop } from "./desktop.js"

class Main{
  constructor(){
    new Event()
    this.asset()
  }

  asset(){
    new Asset().promise.then(()=>{
      this.desktop()
    })
  }

  desktop(){
    new Desktop({mode:"init"})
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