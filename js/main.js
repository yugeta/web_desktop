import { Event }   from "./controller/lib/event.js"
import { Desktop } from "./controller/desktop.js"
import { System }  from "./controller/system.js"
import { Storage } from "./controller/lib/storage.js"
import { Hash }    from "./controller/system/hash.js"

class Main{
  constructor(){
    new Storage()
    new Hash()
    new Event()
    new System()
    new Desktop({mode:"init"})
    // console.log(Storage.datas)
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