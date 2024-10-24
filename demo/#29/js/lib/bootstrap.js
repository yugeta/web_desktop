export class Bootstrap{
  static get root(){
    return document.getElementById("desktop")
  }

  static get elm_main(){
    return Bootstrap.root.querySelector("main.desktop")
  }
  static get elm_header(){
    return Bootstrap.root.querySelector("header")
  }
  static get window_rect(){
    return Bootstrap.elm_main.getBoundingClientRect()
  }
}