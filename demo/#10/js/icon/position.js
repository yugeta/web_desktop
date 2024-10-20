/**
 * アイコンの座標を取得する
 * - options
 * @ size { w , h }
 * @ parent (desktop or window)
 */

export class Position{
  constructor(options){
    this.options = options || {}
    this.datas = this.get_number_pos()
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

  get_number_pos(){
    const num = this.icon_num
    const line_count = ~~(this.parent_size.h / this.icon_size.h)
    const row_number = ~~(num / line_count)
    const col_number = num % line_count
    return {
      x : (row_number * this.icon_size.w),
      y : (col_number * this.icon_size.h),
    }
    // return {
    //   x : this.icon_size.default_x + (row_number * this.icon_size.w) + (row_number * this.icon_size.gap),
    //   y : this.icon_size.default_y + (col_number * this.icon_size.h),
    // }
  }
}