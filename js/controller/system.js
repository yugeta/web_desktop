import { Header } from "../controller/system/header.js"
import { Time }   from "../controller/system/time.js"
import { Auth }   from "../controller/system/auth.js"

export class System{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){

      default:
        new Header()
        new Time({
          format : "normal"
        })
        new Auth()
    }
  }
}