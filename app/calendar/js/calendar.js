export class Calendar{
  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.load()
    })
  }

  get tbody(){
    return this.options.tbody
  }

  load(){
    fetch(this.options.url)
    .then(e=>{return e.json()})
    .then(this.loaded.bind(this))
  }

  loaded(data){
    // console.log(data)
    this.view(data.datas)

    this.finish()
  }

  view(datas){
    for(const data of datas){
      const ymd  = data.date.split("-")
      const date = Number(ymd[2])
      const td   = this.tbody.querySelector(`td[data-date="${date}"]`)
      const html = `<div class="event">${data.title}</div>`
      td.insertAdjacentHTML("beforeend", html)
    }
  }

  finish(){
    this.resolve()
  }

}