/**
 * アイコンの座標を取得する
 * - options
 * @ size { w , h }
 * @ parent (desktop or window)
 */

export class Position{
  constructor(options){
    this.options = options || {}
    switch(this.options.mode){
      case "num":
        this.datas = this.get_num_pos(this.options.num)
      break

      default:
        this.datas = this.get_new_pos()
    }
  }

  get parent_size(){
    return {
      w : this.options.parent.offsetWidth,
      h : this.options.parent.offsetHeight,
    }
  }

  get icon_num(){
    const icons = this.options.parent.querySelectorAll(`:scope > .icon`)
    return icons ? icons.length : 0;
  }

  get icon_size(){
    return this.options.size
  }

  get_new_pos(){
    return this.get_num_pos(this.icon_num)
    // const num = this.icon_num
    // const line_count = ~~(this.parent_size.h / this.icon_size.h)
    // const row_number = ~~(num / line_count)
    // const col_number = num % line_count
    // return {
    //   x : (row_number * this.icon_size.w),
    //   y : (col_number * this.icon_size.h),
    // }
  }

  get_num_pos(num){
    const line_count = ~~(this.parent_size.h / this.icon_size.h)
    const row_number = ~~(num / line_count)
    const col_number = num % line_count
    return {
      x : (row_number * this.icon_size.w),
      y : (col_number * this.icon_size.h),
    }
  }
}