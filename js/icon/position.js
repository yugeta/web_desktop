import { Bootstrap } from "../lib/bootstrap.js"
import { Setting }   from "../component/setting.js"

/**
 * アイコンの座標を取得する
 * - options
 * @ size { w , h } : setting.json
 * @ parent (desktop or window)
 */

export class Position{
  constructor(parent, num){
    this.parent = parent || Bootstrap.elm_main
    if(num !== undefined){
      this.datas = this.get_num_pos(num)
    }
    else{
      this.datas = this.get_new_pos()
    }
  }

  get parent_size(){
    return {
      w : this.parent.offsetWidth,
      h : this.parent.offsetHeight,
    }
  }

  get icon_num(){
    const icons = this.parent.querySelectorAll(`:scope > .icon:not([data-id="trash"])`)
    return icons ? icons.length : 0;
  }

  get icon_size(){
    return Setting.icon.size
  }

  get_new_pos(){
    return this.get_num_pos(this.icon_num)
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