export class ModelBootstrap{
  static get root(){
    return document.getElementById("desktop")
  }

  static get elm_main(){
    return ModelBootstrap.root.querySelector("main.desktop")
  }
  static get elm_header(){
    return ModelBootstrap.root.querySelector("header")
  }
  static get window_rect(){
    return ModelBootstrap.elm_main.getBoundingClientRect()
  }
}