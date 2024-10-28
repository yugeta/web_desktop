import { View } from "./app/view.js"

export class App{
  constructor(options){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject

      this.options = options || {}
      switch(this.options.mode){
        case "view":
          new View(this.options).promise.then(this.finish.bind(this))
        break
      }
    })
  }

  finish(){
    this.resolve()
  }
}