import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Storage }   from "../lib/storage.js"
import { Position }  from "./position.js"

export class View{
  constructor(data){
    if(!data){return}
    this.storage_data = this.get_storage_data()
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

  get_storage_data(){
    const data = new Storage({mode:"load"}).datas
    return data ? data["icon_move"] : null
  }

  check_id(data){
    return data.id ? true : false
  }

  single_icon_view(data){
    if(!data.id){return}
    data.parent = data.parent || Bootstrap.elm_main
    const pos = this.get_pos(data)
    const datas = {...data, ...pos}
    const html = new Convert(this.html, datas).text
    data.parent.insertAdjacentHTML("beforeend", html)
  }

  get_pos(data){
    if(this.storage_data){
      const storage = this.storage_data.find(e => e.id === data.id)
      if(storage){
        return storage.transform
      }
    }
    return new Position({
      size : {
        w : 100,
        h : 100,
        z : 1,
      },
      parent : data.parent,
    }).datas
  }


}