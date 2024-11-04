import { Storage }   from "../lib/storage.js"
import { Bootstrap } from "../lib/bootstrap.js"

export class View{
  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
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

  get ext(){
    return this.data.target.split(".").pop()
  }

  exec(){
    const div = document.createElement("div")
    div.className = "file"
    this.body.appendChild(div)
    this.target = div
    this.load(this.data.target)
  }

  load(file){
    if(!file){return}
    const xhr = new XMLHttpRequest()
    xhr.withCredentials = true
    xhr.open('GET' , file , true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = this.loaded.bind(this)
    xhr.send()
  }

  loaded(e){
    if(this.ext === "html"){
      this.target.innerHTML = e.target.response
    }
    else{
      this.target.innerText = e.target.response
    }
    const pos = this.get_inner_size(this.target)
    this.window.style.setProperty("--w",`${pos.w}px`,"")
    this.window.style.setProperty("--h",`${pos.h}px`,"")
    this.finish()
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