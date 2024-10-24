import { Storage } from "../lib/storage.js"

export class Header{
  constructor(){
    this.menu.addEventListener("click" , this.click.bind(this))
  }
  
  get menu(){
    return document.querySelector(`#desktop header .menu`)
  }

  click(e){
    const item = e.target.closest(".item")
    if(!item){return}
    switch(item.getAttribute("data-mode")){
      case "storage-destroy":
        if(!confirm("デスクトップを初期化してもよろしいですか？")){return}
        new Storage({mode: "destroy"})
      break

      case "sort-icon":
      break
    }
  }


}