import { Bootstrap } from "../lib/bootstrap.js"
import { Asset }     from "../lib/asset.js"
import { Convert }   from "../lib/convert.js"

export class View{
  constructor(data){console.log(data)
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
    const html = new Convert(this.html, data).text
    const parent = data.parent || Bootstrap.elm_main
    parent.insertAdjacentHTML("beforeend", html)
  }


}