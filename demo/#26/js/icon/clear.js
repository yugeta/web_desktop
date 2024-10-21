

export class Clear{
  constructor(parent_elm, except_id){
    if(!parent_elm){return}
    const icons = parent_elm.querySelectorAll(`:scope > .icon[data-select]`)
    for(const icon of icons){
      if(except_id && icon.getAttribute("data-id") === except_id){continue}
      icon.removeAttribute("data-select")
    }
  }
}