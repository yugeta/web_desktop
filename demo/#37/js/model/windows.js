import { ModelBootstrap } from "../model/bootstrap.js"

export class ModelWindows {
  constructor(options){
    this.options = options || {}
    switch(options.mode){

      default:
        this.set_window()
    }
  }
  get id(){
    if(this.options.id){
      return this.options.id
    }
    else if(this.options.elm){
      return this.options.elm.getAttribute("data-id")
    }
  }

  get elm(){
    if(this.options.elm){
      return this.options.elm
    }
    else if(this.id){
      return ModelBootstrap.elm_main.querySelector(`.window[data-id="${this.id}"]`)
    }
  }

  set_window(){
    if(!this.elm || !this.id){return}
    const index = ModelWindows.datas.findIndex(e => e.id === this.id)
    if(index >= 0){
      const data = this.get_add_data()
      for(const key in data){
        ModelWindows.datas[index][key] = data[key]
      }
    }
    else{
      const data = this.get_elm_data()
      ModelWindows.datas.push(data)
    }
  }

  get_add_data(){
    const elm = this.elm
    return {
      id   : this.id,
      w    : Number(elm.style.getPropertyValue("--w").replace("px","") || 0),
      h    : Number(elm.style.getPropertyValue("--h").replace("px","") || 0),
      x    : Number(elm.style.getPropertyValue("--x").replace("px","") || 0),
      y    : Number(elm.style.getPropertyValue("--y").replace("px","") || 0),
      z    : Number(elm.style.getPropertyValue("--z") || 1),
      move : elm.getAttribute("data-move") || "",
    }
  }

  get_elm_data(){
    const elm = this.elm
    return {
      id   : this.id,
      w    : Number(elm.style.getPropertyValue("--w").replace("px","") || 0),
      h    : Number(elm.style.getPropertyValue("--h").replace("px","") || 0),
      x    : Number(elm.style.getPropertyValue("--x").replace("px","") || 0),
      y    : Number(elm.style.getPropertyValue("--y").replace("px","") || 0),
      z    : Number(elm.style.getPropertyValue("--z") || 1),
      move : elm.getAttribute("data-move") || "",
      position : {},
      offset : {},
    }
  }


  static datas = [
    {
      id : "calendar",
      w : 500,
      h : 500,
      position : {
        x : "center",
        y : "center",
      },
      offset  :{
        x : 100,
        y : 100,
      }
    }
  ]
}