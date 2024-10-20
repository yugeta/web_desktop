
/**
 * Icon : Select
 * 
 * Summary
 * - クリックしたアイコンを選択状態にする
 */

export class Select{
  constructor(target_icon){
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
}