/**
 * ２つの数値の計算処理
 * 小数点の誤差対応アリ
 */

export class Calc{
  constructor(num1, num2 , unit){
    this.unit  = unit
    this.num1  = num1 || 0
    this.num2  = num2 || 0
    this.num   = this.calc()
    this.adjust()
  }

  calc(){
    const max = Math.max(
      (String(this.num1).split('.')[1] || '').length,
      (String(this.num2).split('.')[1] || '').length,
    )
    const factor  = Math.pow(10 , max)

    const num1    = this.num1 * factor
    const num2    = this.num2 * factor
    
    const formula = this.unit ? `${num1} ${this.unit} ${num2}` : num2
    const res     =  new Function(`return (${formula})`)()
    return res / (factor * factor)
  }

  adjust(){
    switch(this.num){
      case Infinity:
      case NaN:
        this.num = null;
      break
    }
  }
}