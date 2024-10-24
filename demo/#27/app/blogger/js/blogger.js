/**
 * Load Blogger datas
 * 
 * [Request]
 * type      : 
 * blog_name : Blog sub-domain
 * domain    : Blog domain
 * blog_id   : Blog id
 * post_id   : Article-id
 * path      : Article or Page path
 * label     : Label (array)(and search)
 * page      : Page-name
 * search    : Search words(array)
 * url       : Blogger-feed direct url
 * 
 * 
 * [Response]
 * id         : Blogger-id
 * published  : Publish date-time(global-time)
 * date       : Publish date(local-time)
 * time       : Publish time
 * title      : Blog title
 * html       : Article all(html)
 * text       : Article string(text only)
 * url        : Link URL
 * path       : Blogger address path blogger.com/[path]
 * label      : Labels
 * thumbnail  : Thumbnail url
 * img        : Thumbnail full-size
 * img_middle : Thumbnail 800px
 * img_small  : Thumbnail 400px
 */

import { Uuid } from "./uuid.js"

export class Blogger{
  constructor(options){
    this.promise = new Promise((resolve, reject)=>{
      // this.time = (+new Date())
      // const uuid = new Uuid()
      // this.callback_name =  `blogger_callback_${uuid.id}`
      this.callback_name =  this.get_callback_name()
      this.options = options || {}
      this.set_callback()
      this.resolve = resolve
      this.reject  = reject
      this.load()
    })
  }

  get domain(){
    if(this.options.blog_name){
      return `${this.options.blog_name}.blogspot.com`
    }
    else if(this.options.domain){
      return this.options.domain
    }
    else{
      return null
    }
  }

  get type(){
    switch(this.options.type){
      case "pages":
      case "page":
        return "pages"

      case "article":
      case "posts":
      default:
        return "posts"
    }
  }

  get feed(){
    // blog_idを指定すると、取得件数が多くできる
    const feed = this.options.blog_id ? `https://www.blogger.com/feeds/${this.options.blog_id}` : `https://${this.domain}/feeds`

    switch(this.type){
      case "pages":
        return `${feed}/pages/${this.response}`
      case "comments":
        return `${feed}/comments/${this.response}`
      case "post_comments"://postID/comments
        return `${feed}/${this.options.post_id}/comments/${this.response}`
      case "posts":
        default:
        return `${feed}/posts/${this.response}`
    }
  }

  get response(){
    switch(this.options.response){
      case "summary":
        return "summary"

      default:
        return "default"
    }
  }

  get path(){
    if(this.options.path){
      return this.options.path
    }
    else if(this.options.page){
      return this.options.page
    }
  }

  get label(){
    if(!this.options.label){
      return ""
    }
    // ラベルが複数（配列）ある場合（AND検索）
    if(this.options.label.constructor === Array){
      return ""
    }
    else{
      return `/-/${this.options.label}`
    }
  }

  get max_results(){
    return this.options.max_results ? this.options.max_results : ""
  }

  // 並び順 (published:公開日:default , updated:更新日 )
  get orderby(){
    return this.options.orderby || ""
  }

  get start_index(){
    return this.options.start_index || ""
  }

  // 公開日（◯日以降）: yyyy-mm-dd
  get published_min(){
    return this.options.publiched_min || ""
  }

  // 公開日（◯日以前）: yyyy-mm-dd
  get published_max(){
    return this.options.publiched_max || ""
  }

  // 原稿内検索 (A+B AND検索, A-B NOT検索 , A|B OR検索)
  get search(){
    const datas = []
    if(this.options.search && this.options.search.constructor === Array){
      for(const word of this.options.search){
        datas.push(word)
      }
    }
    else if(typeof this.options.search === "string"){
      datas.push(this.options.search)
    }
    if(this.options.label && this.options.label.constructor === Array){
      for(const label of this.options.label){
        datas.push(`label:${label}`)
      }
    }
    return datas.join("|")
  }

  get query(){
    const datas = []
    if(this.max_results){
      datas.push(`max-results=${this.max_results}`)
    }
    if(this.orderby){
      datas.push(`orderby=${this.orderby}`)
    }
    if(this.start_index){
      datas.push(`start-index=${this.start_index}`)
    }
    if(this.published_min){
      datas.push(`published-min=${this.published_min}`)
    }
    if(this.published_max){
      datas.push(`published-max=${this.published_max}`)
    }
    if(this.search){
      datas.push(`q=${this.search}`)
    }
    if(this.path){
      datas.push(`path=${this.path}`)
    }

    if(datas.length){
      return "&"+ datas.join("&")
    }
    else{
      return ""
    }
  }

  get url(){
    if(this.options.url){
      return this.options.url
    }
    else if(this.type === "pages"){
      return `${this.feed}${this.label}?alt=json&callback=window.${this.callback_name}&${this.path}${this.query}`
    }
    else{
      return `${this.feed}${this.label}?alt=json&callback=window.${this.callback_name}&${this.query}`
    }
  }

  get_callback_name(){
    const uuid = new Uuid()
    return `blogger_callback_${uuid.id}`
  }

  set_callback(){
    window[this.callback_name] = this.blogger_callback.bind(this)
  }

  load(){
    if(!this.domain){
      this.finish(null)
      return
    }
    const script = document.createElement("script")
    script.src = this.url
    console.log(this.url)
    document.body.appendChild(script)
  }

  blogger_callback(res){
    if(!res || !res.feed || !res.feed.entry){
      console.warn(res)
      this.finish(null)
      return
    }
    const datas = []
    for(const entry of res.feed.entry){
      const url  = entry.link.find(e => e.rel === "alternate").href
      const path = "/"+ url.split("/").slice(3).join("/")
      const html = entry.content ? entry.content["$t"] : ""
      const img  = entry["media$thumbnail"] ? entry["media$thumbnail"].url : ""
      datas.push({
        id         : entry.id["$t"],
        publiched  : entry.published["$t"],
        date       : entry.published["$t"].split("T")[0],
        time       : entry.published["$t"].split("T")[1].split(".")[0], //09:00:00.000+09:00
        title      : entry.title["$t"],
        html       : html,
        text       : this.get_html2text(html),
        url        : url,
        path       : path,
        label      : entry.category ? entry.category.map(e => e.term) : null,
        thumbnail  : img,
        img        : this.convert_img_size(img, "s1600"),
        img_middle : this.convert_img_size(img, "s800"),
        img_small  : this.convert_img_size(img, "s400"),
      })
    }
    this.finish(datas)
  }

  get_html2text(html){
    const div = document.createElement("div")
    div.innerHTML = html
    return div.textContent.trim()
  }

  convert_img_size(img, size){
    const sp = img.split("/")
    sp[7]    = size
    return sp.join("/")
  }

  finish(res){
    this.resolve(res)
  }
}