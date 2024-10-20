import { Icon }                   from "../icon.js"
import { Window }                 from "../window.js"
import { Storage }                from "../lib/storage.js"
import { Elm2data as IconData }   from "../icon/elm2data.js"
import { Elm2data as WindowData } from "../window/elm2data.js"

/**
 * windowとiconの移動処理
 */

export class PointerMove{
  constructor(e){
    if(!e.buttons){
      this.end(e)
    }
    else{
      this.start(e)
      this.move(e)
    }
  }

  get_icon_file(elm){
    const src = elm.querySelector("img").getAttribute("src")
    return src.replace(/^img\/icon\//,"")
  }


  // start
  start(e){
    if(PointerMove.options){return}

    const elm_window        = e.target.closest(".window")
    const elm_window_header = e.target.closest(".window .header")
    const elm_window_resize = e.target.closest(".window .resize")
    // const elm_icon          = e.target.closest(".icon")

    // Window-Move（拡大表示の際は機能しない）
    if(elm_window_header && !elm_window.getAttribute("data-wide-flg")){
      PointerMove.options = {
        type : "window",
        mode : "move",
        target : elm_window,
      }
    }

    // Window-Resize
    if(elm_window_resize){console.log("window-resize")
      PointerMove.options = {
        type : "window",
        mode : "resize",
        name : elm_window_resize.getAttribute("name"),
        target : elm_window,
      }
    }

    // // Icon-Move-Start
    // if(elm_icon){
    //   const rect = elm_icon.getBoundingClientRect()
    //   PointerMove.options = {
    //     type   : "icon",
    //     mode   : "move_start",
    //     target : elm_icon,
    //     point  : {
    //       x : e.pageX,
    //       y : e.pageY,
    //     },
    //     diff : {
    //       x : e.pageX - rect.left,
    //       y : e.pageY - rect.top,
    //     },
    //     rect   : rect,
    //     first_window : elm_window,
    //   }
    //   new Icon(PointerMove.options)
    // }
  }


  // move
  move(e){
    if(!PointerMove.options){return}

    PointerMove.options.pointerId = e.pointerId
    PointerMove.options.movement = {
      x : e.movementX,
      y : e.movementY,
    }

    switch(PointerMove.options.type){
      case "window":
        new Window(PointerMove.options)
      break

      // case "icon":
      //   PointerMove.options.mode = "move"
      //   PointerMove.options.point = {
      //     x : e.pageX,
      //     y : e.pageY,
      //   }
      //   new Icon(PointerMove.options)
      // break
    }
  }


  // end
  end(e){
    if(!PointerMove.options){return}

    this.save()
    // if(PointerMove.options.type === "icon"){
    //   PointerMove.options.mode = "move_end"
    //   PointerMove.options.window = e.target.closest(".window")
    //   PointerMove.options.event = e
    //   new Icon(PointerMove.options)
    // }

    PointerMove.options = null
  }


  // データキャッシュ
  save(){
    switch(PointerMove.options.type){
      // case "icon":
      //   new Storage({
      //     mode  : "save",
      //     name  : "icons",
      //     data  : new IconData(PointerMove.options.target).datas,
      //   })
      // break

      case "window":
        new Storage({
          mode : "save",
          name : "windows",
          data : new WindowData(PointerMove.options.target).datas,
        })
      break
    }
  }
}