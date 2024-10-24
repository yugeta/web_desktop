import { Window } from "./window.js"

export class Event{
  constructor(){
    window.addEventListener("click" , this.click.bind(this))
  }

  click(e){
    // アイコンをクリック
    const icon = e.target.closest(".icon")
    if(icon){
      const name = icon.querySelector(".name").textContent
      new Window({
        mode : "view",
        name : name,
      })
    }
    
    // windowのクローズボタンをクリック
    const close = e.target.closest(".window .header .close")
    if(close){
      const elm_window = e.target.closest(".window")
      new Window({
        mode : "close",
        target_window : elm_window,
      })
    }

    // windiwをクリック
    const elm_win = e.target.closest(".window")
    if(elm_win){
      new Window({
        mode : "sort",
        active_window : elm_win,
      })
    }
  }
}