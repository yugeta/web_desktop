import { ViewApp } from "../view/app.js"

export class ControllerApp{
  constructor(options){
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject

      this.options = options || {}
      switch(this.options.mode){
        case "view":
          new ViewApp(this.options).promise.then(this.finish.bind(this))
        break
      }
    })
  }

  finish(){
    this.resolve()
  }
}