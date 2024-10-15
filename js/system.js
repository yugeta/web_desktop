import { Header } from "./system/header.js"
import { Time }   from "./system/time.js"
import { Auth }   from "./system/auth.js"

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