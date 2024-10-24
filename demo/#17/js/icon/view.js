import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Position }  from "../icon/position.js"
import { Elm2data }  from "../icon/elm2data.js"
import { Storage }   from "../lib/storage.js"

export class View{
  constructor(data, parent){
    if(!data){return}
    this.parent = parent || Bootstrap.elm_main
    if(data.constructor === Array){
      for(const single_data of data){
        this.single_icon_view(single_data)
        this.save_storage(single_data)
      }
    }
    else{
      this.single_icon_view(data)
      this.save_storage(data)
    }
  }

  get html(){
    return Asset.get_data("icon").text
  }

  check_id(data){
    return data.id ? true : false
  }

  single_icon_view(data){
    if(!data.id){return}
    if(this.get_parent(data.parent_id) !== this.parent){
      return
    }
    
    const pos = this.get_pos(data)
    const datas = {...data, ...pos}
    const html = new Convert(this.html, datas).text
    const parent = this.parent
    parent.insertAdjacentHTML("beforeend", html)
  }

  get_parent(parent_id){
    if(parent_id){
      return Bootstrap.elm_main.querySelector(`.window[data-id="${parent_id}"] .body`)
    }
    else{
      return Bootstrap.elm_main
    }
  }

  get_pos(data){
    if(data && typeof data.x !== "undefined" && typeof data.y !== "undefined"){
      return {
        x : data.x,
        y : data.y,
      }
    }
    else{
      return new Position(this.parent).datas
    }
  }

  save_storage(data){
    const parent = this.get_parent(data.parent_id)
    if(!parent){return}
    const icon = parent.querySelector(`.icon[data-id="${data.id}"]`)
    if(!icon){return}
    const icon_data = new Elm2data(icon).datas
    new Storage({
      mode : "save",
      name : "icons",
      data : icon_data,
    })
  }
}