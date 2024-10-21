import { View } from "./file/view.js"

export class File{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view":
        new View(this.options)
      break

    }
  }
}