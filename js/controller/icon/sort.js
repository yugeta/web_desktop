export class Sort{
  constructor(icon){
    this.icon = icon
    const icons = this.get_windows()
    if(!icons){return}
    this.replacement(icons)
  }

  // 表示されているwindow一覧を取得
  get_windows(){
    const icons = Array.from(this.icon.parentNode.querySelectorAll(".icon"))
    if(icons){
      icons.sort((a,b)=>{
        const num_a = Number(a.style.getPropertyValue("--z") || 0)
        const num_b = Number(b.style.getPropertyValue("--z") || 0)
        if(num_a < num_b){return -1}
        if(num_a > num_b){return +1}
        return 0
      })
    }
    return icons
  }

  replacement(icons){
    let num = 1
    for(const elm of icons){
      if(elm === this.icon){
        elm.style.setProperty("--z", icons.length, "")
      }
      else{
        elm.style.setProperty("--z", num++, "")
      }
    }
  }
}