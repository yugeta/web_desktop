export class Bootstrap{
  static get elm_main(){
    return document.querySelector("main.desktop")
  }
  static get window_rect(){
    return Bootstrap.elm_main.getBoundingClientRect()
  }
}