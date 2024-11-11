/**
 * LINKタグやSTYLEタグでセットされたCSSのデータを取得したり書き換えたりするモジュール
 * 
 * # Summary
 * - CSSの以下の構造名称を基本とする。
 *   Selector { 
 *     Property : Value ;
 *     ...
 *   }
 * 
 * # Howto
 * - 特定のSelectorの中のProperrt値を取得
 *  - new Style("selector", "property").value : string (インスタンスを使い回す時に使用)
 *  - new Style().get_value("selector", "property") : string
 * 
 * - 特定のSelectorのProperty値を書き換える（同一ドメインファイルの読み込みまたはstyke記述のみ）
 *  -  new Styke().set_value("selector", "property", "value") : void
 */

export class Style{
  constructor(options){
    this.options = options || {}
  }

  get sheets(){
    return document.styleSheets
  }

  get datas(){
    return this.get_styles(this.sheets)
  }

  get value(){
    return this.get_value(this.options.selector, this.options.property)
  }

  get_styles(sheets){
    let datas = []
    for(const sheet of sheets){
      const add_datas = this.get_sheet(sheet)
      if(!add_datas){continue}
      datas = [...datas, ...add_datas]
    }
    return datas
  }

  get_sheet(sheet){
    if(!sheet || !sheet.ownerNode){return}
    if(this.check_domain(sheet.href) !== true){return}
    switch(sheet.ownerNode.localName){
      case "link":
        let datas = []
        for(const rule of sheet.cssRules){
          const res = this.get_rules(sheet, rule)
          if(!res){continue}
          datas = [...datas , ...res]
        }
        return datas

      case "style":
        return Array.from(sheet.cssRules).map(rule => {return {
          sheet : sheet,
          elm   : rule,
          selector : rule.selectorText,
          style : rule.style,
        }})
    }
  }

  get_rules(sheet, rule){
    if(!rule){return}
    if(rule.styleSheet && rule.styleSheet.cssRules){
      return Array.from(rule.styleSheet.cssRules).map(rule => {return {
        sheet : sheet,
        elm   : rule,
        selector : rule.selectorText,
        style : rule.style,
        href  : sheet.href,
      }})
    }
  }

  // Selector/Propertyの値を取得する。（既存のもの）
  get_value(selector, property){
    if(!this.datas || !selector || !property){return null}
    const data = this.datas.find(e => e.selector === selector)
    return data ? data.style.getPropertyValue(property) : null
  }

  // Selector/Propertyの値を書き換え（新規追加含む）
  set_value(selector, property, value, important=""){
    if(!selector || !property || !value || !this.datas){return}
    const data = this.datas.find(e => e.selector === selector)
    data.style.setProperty(property, value , important)
    // console.log(data.style)
  }


  // 同一ドメインのチェック
  check_domain(href){
    if(href === null){return true}
    return location.href.split("/")[2] === href.split("/")[2] ? true : false
  }
}