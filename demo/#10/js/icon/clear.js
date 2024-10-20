

export class Clear{
  constructor(click_element){
    if(!click_element){return}
    const icons = click_element.querySelectorAll(`:scope > .icon[data-select]`)
    for(const icon of icons){
      icon.removeAttribute("data-select")
    }
  }
}