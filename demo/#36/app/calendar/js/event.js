import { View } from "./view.js"

export class Event{
  constructor(options){
    this.options = options || {}
    this.elm_year_month.addEventListener("click", this.click_move_month.bind(this))
  }

  get elm_next_button(){
    return this.options.root.querySelector(".button-next-month")
  }

  get elm_year_month(){
    return this.options.root.querySelector(`.year-month`)
  }

  get year(){
    return Number(this.elm_year_month.getAttribute("data-year"))
  }

  get month(){
    return Number(this.elm_year_month.getAttribute("data-month"))
  }

  get past_ym(){
    const dt = new Date(this.year, this.month-1, 1)
    dt.setMonth(dt.getMonth()-1)
    return {
      y : dt.getFullYear(),
      m : dt.getMonth()+1,
    }
  }

  get next_ym(){
    const dt = new Date(this.year, this.month-1, 1)
    dt.setMonth(dt.getMonth()+1)
    return {
      y : dt.getFullYear(),
      m : dt.getMonth()+1,
    }
  }

  click_move_month(e){
    const p = e.target.closest("p")
    if(!p){return}
    switch(p.className){
      case "button-past-month":
        new View({
          root  : this.options.root,
          table : this.options.table,
          year  : this.past_ym.y,
          month : this.past_ym.m,
        })
      break

      case "button-next-month":
        new View({
          root  : this.options.root,
          table : this.options.table,
          year  : this.next_ym.y,
          month : this.next_ym.m,
        })
      break
    }
  }

}