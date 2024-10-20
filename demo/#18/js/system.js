import { Header } from "./system/header.js"

export class System{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){

      default:
        new Header()
    }
  }
}