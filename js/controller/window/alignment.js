import { ModelBootstrap } from "../../model/bootstrap.js"
import { ModelStorage }   from "../../model/storage.js"

export class ControllerWindowAlignment{
  constructor(options){
    this.exec()
  }

  get windows(){
    return Array.from(ModelBootstrap.elm_main.querySelectorAll(`:scope > .window`))
  }

  get windows_count(){
    return this.windows.length
  }

  // 横並び個数
  get cols_count(){
    return Math.ceil(ModelBootstrap.elm_main.offsetWidth / 500)
  }

  get rows_count(){
    return Math.ceil(this.windows_count / this.cols_count)
  }

  get window_width(){
    return Math.floor(ModelBootstrap.elm_main.offsetWidth / this.cols_count)
  }

  get window_height(){
    const height = Math.floor(ModelBootstrap.elm_main.offsetWidth / this.rows_count)
    return height >= 300 ? 300 : height
  }

  exec(){
    const windows = this.windows

    // 整列移動
    for(let i=0; i<windows.length; i++){
      const data = {
        id   : windows[i].getAttribute("data-id"),
        name : windows[i].querySelector(`.header .name`).textContent,
        x    : (i % this.cols_count) * this.window_width,
        y    : Math.floor(i / this.cols_count) * this.window_height,
        w    : this.window_width,
        h    : this.window_height,
      }

      windows[i].style.setProperty("--x", `${data.x}px`, "")
      windows[i].style.setProperty("--y", `${data.y}px`, "")
      windows[i].style.setProperty("--w", `${data.w}px`, "")
      windows[i].style.setProperty("--h", `${data.h}px`, "")
      
      this.set_storage_data(data)
    }
  }

  set_storage_data(data){
    new ModelStorage({
      mode : "save",
      name : "windows",
      data : {
        mode : "windows",
        id   : data.id,
        name : data.name,
        x : data.x,
        y : data.y,
        w : data.w,
        h : data.h,
      }
    })
  }

}