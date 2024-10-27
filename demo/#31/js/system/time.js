import { Bootstrap } from "../lib/bootstrap.js"

/**
 * Web-osのデスクトップ上部の日付、時計をリアルタイム更新する機能
 */

export class Time{
  format = "normal" // ["normal" , "ja", "short"]

  constructor(options){
    this.options = options || {}
    if(!this.root){return}
    this.format = this.options.format || this.format
    this.view()
    this.loop()
  }

  get root(){
    return Bootstrap.elm_header.querySelector(`.time`)
  }

  get elm_date(){
    return this.root.querySelector('.ymd')
  }

  get elm_time(){
    return this.root.querySelector('.his')
  }

  get datetime(){
    return {
      ...this.date,
      ...this.time,
      ...{md: this.meridiem}
    }
  }

  get date(){
    return {
      y : this.d.getFullYear(),
      m : this.d.getMonth() + 1,
      d : this.d.getDate(),
      w : this.d.getDay(),
    }
  }

  get time(){
    return {
      h : this.d.getHours(),
      i : this.d.getMinutes(),
      s : this.d.getSeconds(),
    }
  }

  // 午前,am(ante meridiem) 午後,pm(past meridiem)
  get meridiem(){
    switch(this.format){
      case "ja" : return this.time.h < 12 ? "午前" : "午後"
      default   : return this.time.h < 12 ? "AM" : "PM"
    }
  }

  get date_format(){
    const data = this.datetime
    const w    = this.week_string(data.w)
    const y    = data.y
    const m    = this.zero_padding(data.m)
    const d    = this.zero_padding(data.d)

    switch(this.format){
      case "ja"    : return `${y}年${m}月${d}日 (${w})`
      case "short" : return `${y}/${m}/${d}`
      default      : return `${y}/${m}/${d} (${w})`
    }
  }

  get time_format(){
    const data = this.datetime
    const w    = this.week_string(data.w)
    const h    = this.zero_padding(data.h)
    const i    = this.zero_padding(data.i)
    const s    = this.zero_padding(data.s)
    const md   = this.zero_padding(data.md)

    switch(this.format){
      case "ja"    : return `${md} ${h}時${i}分${s}秒`
      case "short" : return `${h}:${i}:${s}`
      default      : return `${md} ${h}:${i}:${s}`
    }
  }


  view(){
    this.d = new Date()
    this.elm_date.textContent = this.date_format
    this.elm_time.textContent = this.time_format
  }

  loop(){
    setInterval(this.view.bind(this) , 1000)
  }

  week_string(week){
    switch(this.format){
      case "ja"    : return ['日','月','火','水','木','金','土'][week]
      case "en"    : return ['Sun','Mon','Tsu','Wed','Thu','Fri','Sut'][week]
      case "short" : return ""
      default      : return ['日','月','火','水','木','金','土'][week]
    }
  }

  zero_padding(num =0, padding_str="00"){
    return (padding_str + String(num)).slice(padding_str.length * -1)
  }

}