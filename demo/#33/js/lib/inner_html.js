/**
 * 読み込んだHTMLをinnerHTMLする処理
 * - options.html   : insertするHTML（ファイルから読み取ったデータ）
 * - options.target : 指定elm内にinnerHTMLする
 * - options.root   : src属性の要素(scriptタグ)で、相対パスの場合は、toorパスを指定の階層に合わせる
 * - scriptタグがhtml内に入っている場合に、実行されないため、強制実行する処理を追加
 * 
 */

export class InnerHtml{
  constructor(options){
    this.options = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      this.exec()
    })
  }

  get html(){
    return this.options.html
  }

  get scripts(){
    return Array.from(this.target.querySelectorAll('script'))
  }

  // htmlを入れ込むparentNode
  get target(){
    return this.options.target
  }

  // 任意データ（nullの場合は、パスの書き換えは行わない）
  get root(){
    return this.options.root
  }

  exec(){
    this.target.innerHTML = this.options.root ? this.change_path(this.html) : this.html
    this.kepp_scripts = this.scripts
    this.exec_scripts()
  }

  // 非同期で順次処理を実行（ファイル読み込み）する
  exec_scripts(){
    if(!this.kepp_scripts || !this.kepp_scripts.length){
      this.finish()
      return
    }
    const target_script = this.kepp_scripts.shift()
    if(target_script.closest("svg")){
      this.exec_scripts()
    }
    else if(target_script.hasAttribute('src')){
      this.exec_script_src(target_script)
    }
    else{
      this.exec_script_run(target_script)
    }
    target_script.parentNode.removeChild(target_script)
  }

  exec_script_src(script){
    const src = script.getAttribute("src")
    const dt = (+new Date())
    const new_src = src.indexOf("?") === -1 ? `${src}?${dt}` : `${src}&${dt}`
    const new_script = document.createElement('script')
    new_script.onload = this.exec_scripts.bind(this)
    this.copy_attributes(script , new_script)
    new_script.setAttribute("src" , new_src)
    script.parentNode.insertBefore(new_script , script)
  }

  exec_script_run(script){
    const script_value = script.textContent
    try{
      Function('(' + script_value + ')')();
      this.exec_scripts()
    }
    catch(err){
      console.warn(err)
    }
  }

  copy_attributes(before_elm , after_elm){
    if(!before_elm || !after_elm){return}
    const attributes = before_elm.attributes
    if(!attributes || !attributes.length){return}
    for(const attr of attributes){
      after_elm.setAttribute(attr.nodeName , attr.nodeValue)
    }
  }

  // rootパスがある場合に、読み込みファイルのpathを変更する。（ソーカルパス & 相対パスのみ有効）
  // link, script, img, iframe ...
  change_path(html){
    const div = document.createElement("div")
    div.innerHTML = this.html
    const elms = div.querySelectorAll("[src],[href]")
    for(const elm of elms){
      if(elm.hasAttribute("href")){
        const path = elm.getAttribute("href")
        elm.setAttribute("href", this.get_target_path(path))
      }
      else if(elm.hasAttribute("src")){
        const path = elm.getAttribute("src")
        elm.setAttribute("src", this.get_target_path(path))
      }
    }
    return div.innerHTML
  }
  
  get_target_path(path){
     // 処理の除外判定
    if(path.match(/^(http:\/\/|httls:\/\/|\/)/)){
      return path
    }
    else{
      return `${this.root}/${path}`
    }
  }

  finish(){
    this.resolve()
  }
}