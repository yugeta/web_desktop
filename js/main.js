import { Event }   from "./lib/event.js"
import { Asset }   from "./lib/asset.js"
import { Desktop } from "./desktop.js"
import { System }  from "./system.js"
import { Storage } from "./lib/storage.js"

class Main{
  constructor(){
    new Storage()
    console.log(Storage.datas)
    new Event()
    
    this.asset()
  }

  asset(){
    new Asset().promise.then(()=>{
      new System()
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