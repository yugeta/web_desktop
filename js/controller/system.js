import { ControllerHeader } from "../controller/header.js"
import { ControllerTime }   from "../controller/time.js"
import { ControllerAuth }   from "../controller/auth.js"

export class ControllerSystem{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){

      default:
        new ControllerHeader()
        new ControllerTime({
          format : "normal"
        })
        new ControllerAuth()
    }
  }
}