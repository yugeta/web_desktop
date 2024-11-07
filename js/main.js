import { Event }   from "./lib/event.js"
import { Desktop } from "./desktop.js"
import { System }  from "./system.js"
import { Storage } from "./lib/storage.js"
import { Hash }    from "./system/hash.js"

class Main{
  constructor(){
    new Storage()
    new Hash()
    new Event()
    new System()
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