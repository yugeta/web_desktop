import { Select } from "./icon/select.js"
import { Clear }  from "./icon/clear.js"
import { View }   from "./icon/view.js"

export class Icon{
  constructor(options){
    switch(options.mode){
      case "view":
        new View(options.data)
      break
      
      case "select":
        new Select(options.icon)
      break

      case "clear":
        new Clear(options.click_element)
      break
    }
  }
}