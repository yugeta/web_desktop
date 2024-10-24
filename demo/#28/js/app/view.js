import { Storage }   from "../lib/storage.js"
import { Bootstrap } from "../lib/bootstrap.js"
import { InnerHtml } from "../lib/inner_html.js"

export class View{
  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      // this.view()
      this.exec()
    })
  }

  get id(){
    return this.options.id
  }

  get window(){
    return this.body.closest(".window")
  }

  get body(){
    return this.options.parent
  }

  get data(){
    return Storage.datas.icons.find(e => e.id === this.id)
  }

  get file(){
    return this.data.target || `app/${this.id}/index.html`
  }

  get ext(){
    const filename = this.file.split("#")[0].split("?")[0]
    const ext      = filename.split(".").pop()
    return ext.toLowerCase()
  }

  get root_path(){
    switch(this.ext){
      case "html":
        return this.file.split("/").slice(0,-1).join("/")

    }
  }

  get type(){
    switch(this.ext){
      case "html":
        return "html"

      case "js":
        return "js"

      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
      case "svg":
      case "webp":
        return "img"

      case "json":
      case "txt":
      default:
        return "text"
    }
  }

  exec(){
    switch(this.type){
      case "text":
      case "html":
        this.load()
      break

      case "img":
        this.view_img()
      break

      case "js":
        this.view_js(this.file)
      break
    }
  }

  load(){
    if(!this.file){return}
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open('GET' , this.file , true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = this.loaded.bind(this)
    xhr.send()
  }

  loaded(e){
    const pos = this.get_inner_size(this.body)
    this.window.style.setProperty("--w",`${pos.w}px`,"")
    this.window.style.setProperty("--h",`${pos.h}px`,"")
    this.view(e.target.response)
    this.finish()
  }

  view(str){
    switch(this.ext){
      case "html":
        this.view_html(str)
      break

      default:
        this.view_text(str)
    }
  }

  view_text(text){
    this.body.innerText = text
  }

  view_html(html){
    new InnerHtml({
      html   : html,
      target : this.body,
      root   : this.root_path,
    })
  }

  view_img(src){
    const img = new Image()
    img.src = src
    this.body.appendChild(img)
  }

  view_js(src){
    const script = document.createElement("script")
    script.type  = "module"
    script.src   = src
    this.body.appendChild(script)
  }

  get_inner_size(elm){
    const inner_w     = elm.scrollWidth
    const inner_h     = elm.scrollHeight
    const half_main_w = Bootstrap.elm_main.offsetWidth  / 2
    const half_main_h = Bootstrap.elm_main.offsetHeight / 2
    return {
      w : inner_w <= half_main_w ? inner_w : half_main_w,
      h : inner_h <= half_main_h ? inner_h + 30 + 20 : half_main_h,
    }
  }

  finish(){
    this.resolve()
  }
}