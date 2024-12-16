import { Event }             from "./lib/event.js"
import { ControllerDesktop } from "./controller/desktop.js"
import { ControllerSystem }  from "./controller/system.js"
import { ModelStorage }      from "./model/storage.js"
import { ControllerHash }    from "./controller/hash.js"

class Main{
  constructor(){
    new ModelStorage()
    new ControllerHash()
    new Event()
    new ControllerSystem()
    new ControllerDesktop({mode:"init"})
    // console.log(ModelStorage.datas)
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