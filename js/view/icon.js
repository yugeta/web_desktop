import { ModelBootstrap } from "../model/bootstrap.js"
import { ComponentHtml }  from "../component/html.js"
import { Convert }        from "../lib/convert.js"
import { Position }       from "../controller/icon/position.js"
import { Trash }          from "../controller/icon/trash.js"
import { ControllerIcon } from "../controller/icon.js"

export class ViewIcon{
  constructor(data, parent){
    if(!data){return}
    this.parent = parent || ModelBootstrap.elm_main
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
    return ComponentHtml.icon
  }

  check_id(data){
    return data.id ? true : false
  }

  single_icon_view(data){//console.log(data)
    if(!data.id){return}
    if(this.get_parent(data.parent_id) !== this.parent){
      return
    }
    const pos = this.get_pos(data)
    // console.log(pos)
    const datas = {...data, ...pos}
    datas.icon = new ControllerIcon(datas).icon
    this.check_name(datas)
    const html = new Convert(this.html, datas).text
    const parent = this.parent
    parent.insertAdjacentHTML("beforeend", html)
    return datas
  }

  get_parent(parent_id){
    if(parent_id){
      return ModelBootstrap.elm_main.querySelector(`.window[data-id="${parent_id}"] .body`)
    }
    else{
      return ModelBootstrap.elm_main
    }
  }

  get_pos(data){
    if(data.type === "trash"){
      return new Trash().fixed_position
    }
    else if(data && typeof data.x === "number" && typeof data.y === "number"){
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
    // if(!icon){return}
    // new Storage({
    //   mode : "save",
    //   name : "icons",
    //   data : data,
    // })
  }

  check_name(data){
    if(data.name){return}
    if(data.target){
      data.name = data.target.split("/").pop()
    }
  }
}