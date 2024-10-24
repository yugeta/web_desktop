import { View } from "./app/view.js"

export class App{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view":
        new View(this.options)
      break

    }
  }
}