import { ModelBootstrap } from "../model/bootstrap.js"

/**
 * アラート(Modal)表示
 * 
 * [howto]
 * new Modal("string")
 * new Modal(options)
 * 
 * [options]
 * {
 *   message : "string",
 *   buttons:[
 *      {
 *        key : "success",
 *        name : "OK",
 *        callback : function(){...},
 *      },
 *      {
 *        key : "error",
 *        name : "NG",
 *        callback : function(){...},
 *      },
 *      {
 *        key : "close",
 *        name : "閉じる",
 *      }
 *   ],
 * }
 * ※ buttonsのkeyに"close"をセットした場合は、自動的に閉じるボタンになる。
 */

export class ControllerModal{
  constructor(options){
    if(this.is_viewing){return}
    if(typeof options === "string"){
      this.view(options)
    }
    else if(typeof options === "object"){
      this.exec(options)
    }
  }

  id = "modal"

  get elm(){
    return document.getElementById(this.id)
  }

  get is_viewing(){
    return this.elm ? true : false
  }

  view(message){
    const div = document.createElement("div")
    div.id = this.id
    const html = `${message}
${this.get_button()}`
    div.innerHTML = html
    ModelBootstrap.elm_main.appendChild(div)
    this.set_event()
  }

  get_button(){
    return `<button class="close">閉じる</button>`
  }

  click_button(e){
    const button = e.target.closest("button")
    if(!button){return}
    const type = button.getAttribute("class")
    this.click_vihavior(type)
  }

  click_vihavior(type){
    switch(type){
      case "close":
        this.close()
      break

    }
  }

  set_event(){
    const btns = this.elm.querySelectorAll("button")
    for(const btn of btns){
      btn.addEventListener("click" , this.click_button.bind(this))
    }
  }

  set_events(buttons){
    for(const btn of buttons){
      const button = this.elm.querySelector(`button[class="${btn.key}"]`)
      if(!button){continue}
      if(btn.callback){
        button.addEventListener("click" , btn.callback)
      }
      else if(btn.key === "close"){
        button.addEventListener("click" , this.click_button.bind(this))
      }
    }
  }

  exec(option){
    const buttons = []
    for(const btn of option.buttons){
      buttons.push(`<button class="${btn.key}">${btn.name}</button>
`)
    }
    const buttons_html = buttons.join("")
    const div = document.createElement("div")
    div.id = this.id
    const html = `${option.message}
<div class="buttons">${buttons_html}</div>`
    div.innerHTML = html
    ModelBootstrap.elm_main.appendChild(div)
    this.set_events(option.buttons)
  }

  close(){
    if(!this.elm){return}
    this.elm.parentNode.removeChild(this.elm)
  }
}