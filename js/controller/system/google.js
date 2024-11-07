import { Auth }     from '../../model/component/auth.js'

export class Google{
  static datas = null

  constructor(options){
    this.options   = options || {}
    this.promise = new Promise((resolve, reject)=>{
      this.resolve = resolve
      this.reject  = reject
      if(this.is_script_tag){
        this.mode()
      }
      else{
        this.load_module()
      }
    })
  }

  get parent_id(){
    return this.options.parent_id || ''
  }

  get client_id(){
    const data = Main.auth.get_auth_data()
    return data.google_oauth2 ? data.google_oauth2.client_id : ''
  }

  get google_function(){
    return window.google
  }

  get is_script_tag(){
    const reg = new RegExp(`^${this.google_client_src}(.*?)`)
    const scripts = document.getElementsByTagName('script')
    for(const script of scripts){
      if(!script.src){continue}
      if(script.getAttribute('src').match(reg)){
        return true
      }
    }
    return false
  }

  get google_client_id(){
    return Auth.google_auth.client_id
  }

  get google_client_src(){
    return Auth.google_auth.module_src
  }

  load_module(){
    const script = document.createElement('script')
    const dt = (+new Date())
    script.src = `${this.google_client_src}?temp=${dt}`
    script.async = true
    script.defer = true
    script.addEventListener('load' , this.loaded_module.bind(this))
    document.querySelector('head').appendChild(script)
  }

  loaded_module(){
    setTimeout(this.mode.bind(this) , 100)
  }

  mode(){
    switch(this.options.mode){
      case "login":
        this.login()
      break
    }
  }

  login(){
    if(!this.google_function || !this.options.elm){return}
    this.google_function.accounts.id.initialize({
      client_id          : this.google_client_id,
      prompt_parent_id   : 'google_login',
      style              : 'position:static;',
      auto_prompt        : true,
      auto_select        : true,
      cancel_on_tap_outside : true,
      callback           : this.logined.bind(this),
    })
    this.google_function.accounts.id.renderButton(
      /** @type{!HTMLElement} */ this.options.elm,
      /** @type{!GsiButtonConfiguration} */ {
        logo_alignment : 'center',
        size : 'large',
      }
    )
  }

  logined(datas){
    Google.datas = this.jwt_decode(datas.credential)
    this.finish()
  }
  
  check_ui_cancel(e){
    if(e.l === 'suppressed_by_user'){
      /**
       * error
       * h: "display"
       * i: false
       * l: "suppressed_by_user"
       */
      // console.log(
      //   e.getDismissedReason(),
      //   e.getNotDisplayedReason(),
      //   e.getSkippedReason(),
      //   e.getMomentType(),
      // )
      // this.google_module.accounts.id.cancel(e=>{console.log('cencel',e)})
      // this.google_module.accounts.id.prompt((e)=>{console.log('2',e)})
      // return {h:'display',i : true}
    }
    else{
      /**
       * success
       * h: "display"
       * i: true
       */
    }
    return true
  }

  cancel(e){
    console.log(e)
    console.log(this.google_module.accounts.id)
    this.google_module.accounts.id.cancel()
  }

  prompt(){
    this.google_module.accounts.id.prompt(this.check_ui_cancel.bind(this))
  }

  login_close(){

  }


  logout(){
    this.google_module.accounts.id.disableAutoSelect()
    this.finish()
  }

  view_header_login(){

  }

  jwt_decode(jwt){
    const base64Url = jwt.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const str1 = atob(base64)
    const str2 = escape(str1)
    const str3 = decodeURIComponent(str2)
    return JSON.parse(str3)
  }

  finish(){
    this.login_close()
    this.resolve()
  }
}