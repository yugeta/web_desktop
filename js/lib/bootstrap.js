export class Bootstrap{
  static get elm_main(){
    return document.querySelector("#desktop main.desktop")
  }
  static get elm_header(){
    return document.querySelector("#desktop header")
  }
  static get window_rect(){
    return Bootstrap.elm_main.getBoundingClientRect()
  }
}