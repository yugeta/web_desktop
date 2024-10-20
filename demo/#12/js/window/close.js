export class Close{
  constructor(target_window){
    target_window.parentNode.removeChild(target_window)
  }
}