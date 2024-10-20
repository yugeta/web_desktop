export class Icon{
  constructor(options){
    switch(options.mode){
      case "select":
        this.select(options.icon)
      break

      case "clear":
        this.clear(options.click_element)
      break
    }
  }

  // クリックしたアイコンを選択状態にする
  select(target_icon){
    if(!target_icon || target_icon.hasAttribute("data-select")){return}
    const icons = target_icon.parentNode.querySelectorAll(`:scope > .icon`)
    for(const icon of icons){
      if(icon === target_icon){
        icon.setAttribute("data-select", true)
      }
      else if(icon.hasAttribute("data-select")){
        icon.removeAttribute("data-select")
      }
    }
  }

  // デスクトップまたはウィンドウのアイコン選択を解除する
  clear(click_element){
    if(!click_element){return}
    const icons = click_element.querySelectorAll(`:scope > .icon[data-select]`)
    for(const icon of icons){
      icon.removeAttribute("data-select")
    }
  }
}