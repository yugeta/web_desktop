import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Position }  from "../icon/position.js"
import { Elm2data }  from "../icon/elm2data.js"
import { Storage }   from "../lib/storage.js"
import { Icon }      from "../icon.js"

export class View{
  constructor(data, parent){
    if(!data){return}
    this.parent = parent || Bootstrap.elm_main
    if(data.constructor === Array){
      for(const single_data of data){
        const res = this.single_icon_view(single_data)
        this.save_storage(res)
      }
    }
    else{
      const res = this.single_icon_view(data)
      this.save_storage(res)
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
    this.check_file(datas)
    this.check_name(datas)
    const html = new Convert(this.html, datas).text
    const parent = this.parent
    parent.insertAdjacentHTML("beforeend", html)
    return datas
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
    if(!data){return}
    const parent = this.get_parent(data.parent_id)
    if(!parent){return}
    const icon = parent.querySelector(`.icon[data-id="${data.id}"]`)
    if(!icon){return}
    // const icon_data = new Elm2data(icon).datas
    // console.log(data,icon_data)
    new Storage({
      mode : "save",
      name : "icons",
      data : data,
    })
  }

  // 
  check_file(data){
    data.icon = new Icon(data).icon
  }

  check_name(data){
    if(data.name){return}
    if(data.target){
      data.name = data.target.split("/").pop()
    }
  }
}