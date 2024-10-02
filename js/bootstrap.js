export class Bootstrap{
  static pos = {
    x: 80, 
    y: 20,
  }

  static gap = {
    x: 30, 
    y: 40,
  }

  static size = {
    w : 300,
    h : 200,
  }

  static z = 1000


  static get elm_main(){
    return document.querySelector("main.desktop")
  }
  static get window_rect(){
    return Bootstrap.elm_main.getBoundingClientRect()
  }
}