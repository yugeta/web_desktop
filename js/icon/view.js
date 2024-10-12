import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
// import { Storage }   from "../lib/storage.js"
import { Position }  from "../icon/position.js"
// import { Elm2data }      from "../icon/elm2data.js"

export class View{
  constructor(data, parent){
    if(!data){return}
    this.parent = parent || Bootstrap.elm_main
    if(data.constructor === Array){
      for(const single_data of data){
        this.single_icon_view(single_data)
      }
    }
    else{
      this.single_icon_view(data)
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

      // this.set_storage_data(data)
      return
    }
    
    const pos = this.get_pos(data)
    const datas = {...data, ...pos}
    const html = new Convert(this.html, datas).text
    const parent = this.parent
    parent.insertAdjacentHTML("beforeend", html)

    const elm = this.parent.querySelector(`.icon[data-id="${data.id}"]`)
    // this.set_storage_data(new Elm2data(elm).datas)
    // this.set_storage_data(data)
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
    // if(Storage.datas 
    // && Storage.datas.icons 
    // && Storage.datas.icons.length){
    //   const res = Storage.datas.icons.find(e => e.id === data.id)
    //   if(res){
    //     return {
    //       x : res.x,
    //       y : res.y,
    //     }
    //   }
    // }
    if(data && data.x && data.y){
      return {
        x : data.x,
        y : data.y,
      }
    }
    return new Position(this.parent).datas
  }

  // set_storage_data(data){
  //   new Storage({
  //     mode : "save",
  //     name : "icons",
  //     data : data,
  //   })
  // }
}