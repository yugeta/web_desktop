export class ControllerWindowViewType{
  constructor(target_window){
    this.window = target_window
    this.change()
  }

  get current_type(){
    return this.window.getAttribute("data-view-type")
  }

  change(){
    switch(this.current_type){
      case "icon":
        this.window.setAttribute("data-view-type" , "list")
      break

      case "list":
        this.window.setAttribute("data-view-type" , "icon")
      break
    }
  }
}