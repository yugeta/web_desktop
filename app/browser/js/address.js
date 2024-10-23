

export class Address{
  constructor(){
    this.set_event()
  }

  static get input_address(){
    return document.querySelector(`.browser-frame .address input[name="address"]`)
  }

  static get iframe_page(){
    return document.querySelector(`.browser-frame iframe`)
  }

  set_event(){
    Address.input_address.addEventListener("change" , this.change_address.bind(this))
  }

  change_address(){
    const url = Address.input_address.value
    Address.iframe_page.src = url
  }
}