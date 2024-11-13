export class ControllerWindowWide{
  constructor(elm_window){
    // 拡大
    if(!elm_window.hasAttribute("data-wide-flg")){
      elm_window.setAttribute("data-wide-flg" , "true")
    }
    // 縮小
    else{
      elm_window.removeAttribute("data-wide-flg")
    }
  }
}