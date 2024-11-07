import { File as ViewFile } from "../view/file.js"

export class File{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "view":
        new ViewFile(this.options)
      break

    }
  }
}