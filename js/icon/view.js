import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"
import { Position }  from "./position.js"

export class View{
  constructor(data){
    if(!data){return}
    if(data.constructor === Array){
      for(const single_data of data){
        this.single_icon_view(single_data)
      }
    }
    else{
      this.single_icon_view(single_data)
    }
  }

  get html(){
    return Asset.get_data("icon").text
  }

  single_icon_view(data){
    const parent = data.parent || Bootstrap.elm_main
    const pos = new Position({
      size : {
        w : 100,
        h : 100,
        z : 1,
      },
      parent : parent,
    }).datas
    const datas = {...data, ...pos}
    const html = new Convert(this.html, datas).text
    parent.insertAdjacentHTML("beforeend", html)
  }


}