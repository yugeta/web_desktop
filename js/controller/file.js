import { ViewFile } from "../view/file.js"

export class ControllerFile{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view":
        new ViewFile(this.options)
      break

    }
  }
}