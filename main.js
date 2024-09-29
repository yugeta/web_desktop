
class Main{
  constructor(){
    this.set_event()
  }

  get elm_main(){
    return document.querySelector("main.desktop")
  }

  set_event(){
    window.addEventListener("click" , this.click.bind(this))
  }

  click(e){
    // アイコンをクリック
    const icon = e.target.closest(".icon")
    if(icon){
      const name = icon.querySelector(".name").textContent
      this.view_window({
        name : name
      })
    }
    
    // windowのクローズボタンをクリック
    const close = e.target.closest(".window .header .close")
    if(close){
      const elm_window = e.target.closest(".window")
      elm_window.parentNode.removeChild(elm_window)
    }
  }

  view_window(options){
    // same window don't view
    if(this.elm_main.querySelector(`.window[name="${options.name}"]`)){return}
    const elm_window = document.createElement("div")
    elm_window.className = "window"
    elm_window.name = options.name
    elm_window.innerHTML = `<div class="header">
  <span class="name">${options.name}</span>
  <div class="close"></div>
</div>
<div class="body"></div>
`
    this.elm_main.appendChild(elm_window)
  }
}


switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
  break
  default:
    window.addEventListener("DOMContentLoaded", (()=>new Main()))
}