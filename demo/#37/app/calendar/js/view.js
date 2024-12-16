import { Calendar } from "./calendar.js"
import { Setting }  from "./setting.js"

export class View{
  constructor(options){
    this.options = options || {}
    this.clear()
    this.set_ym()
    this.view_year()
    this.view_month()
    this.view_calendar()
    this.exec()
  }

  get now_date(){
    const dt = new Date()
    return {
      y : this.options.year  || dt.getFullYear(),
      m : this.options.month || dt.getMonth()+1,
    }
  }

  get tbody(){
    return this.options.table.querySelector("tbody")
  }

  get elm_year(){
    return this.options.root.querySelector(".year")
  }

  get elm_month(){
    return this.options.root.querySelector(".month")
  }

  get year(){
    return Number(this.elm_year_month.getAttribute("data-year"))
  }

  get month(){
    return Number(this.elm_year_month.getAttribute("data-month"))
  }

  get elm_year_month(){
    return this.options.root.querySelector(`.year-month`)
  }

  clear(){
    this.tbody.innerHTML = ""
  }

  set_ym(){
    this.elm_year_month.setAttribute("data-year" , this.now_date.y)
    this.elm_year_month.setAttribute("data-month", this.now_date.m)
  }

  exec(){
    const month_info = this.get_month_info(this.year, this.month)
    const week_count = (month_info.last_date + month_info.first_week) / 7
    let date = 0
    for(let week=0; week<week_count; week++){
      const tr = document.createElement("tr")
      let html = ""
      for(let d=0; d<7; d++){
        let date_str = ""
        if(week === 0 && d < month_info.first_week){
          date_str = ""
        }
        else if(date >= month_info.last_date){
          date_str = ""
        }
        else{
          date++
          date_str = date
        }
        html += `<td data-date="${date_str}">${date_str}</td>`
      }
      tr.innerHTML = html
      this.tbody.appendChild(tr)
    }
  }

  get_month_info(year,month){
    return {
      year       : year,
      month      : month,
      first_week : new Date(year, month-1, 1).getDay(),
      last_date  : new Date(year, month  , 0).getDate(),
    }
  }

  view_year(){
    this.elm_year.innerText = this.year
  }

  view_month(){
    this.elm_month.innerText = this.month
  }

  view_calendar(){
    new Calendar({
      url   : `${Setting.datas.url}?year=${this.year}&month=${this.month}`,
      tbody : this.tbody,
    })
  }

}